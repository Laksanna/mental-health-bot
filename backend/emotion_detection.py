import cv2
import numpy as np
from tensorflow import keras
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
import tensorflow as tf
import os

class EmotionDetector:
    def __init__(self, model_path='models/emotion_mobilenet.h5'):
        self.emotion_labels = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']
        self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        
        if os.path.exists(model_path):
            self.model = keras.models.load_model(model_path)
        else:
            self.model = self._create_simple_model()
            os.makedirs('models', exist_ok=True)
            self.model.save(model_path)
    
    def _create_simple_model(self):
        """Create a state-of-the-art Transfer Learning model (MobileNetV2)"""
        # Load MobileNetV2 without the top classification layer
        base_model = MobileNetV2(
            input_shape=(48, 48, 3), 
            include_top=False, 
            weights='imagenet'
        )
        
        # Freeze the base model layers initially
        base_model.trainable = False
        
        # Add custom layers on top for our 7 emotion classes
        x = base_model.output
        x = GlobalAveragePooling2D()(x)
        x = Dense(256, activation='relu')(x)
        x = Dropout(0.5)(x)
        predictions = Dense(7, activation='softmax')(x)
        
        model = Model(inputs=base_model.input, outputs=predictions)
        
        # We use a lower learning rate for transfer learning
        model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=0.001), 
            loss='categorical_crossentropy', 
            metrics=['accuracy']
        )
        return model

    def generate_gradcam(self, img_array, expected_emotion=None):
        """Generates a Grad-CAM heatmap highlighting which facial features drove the prediction"""
        try:
            # Find the last convolutional layer
            last_conv_layer = None
            for layer in reversed(self.model.layers):
                # output_shape can be a tuple (batch, h, w, c) or a list of tuples
                # We need a layer with 4D spatial output
                shape = layer.output_shape
                if isinstance(shape, list):
                    shape = shape[0]
                if isinstance(shape, tuple) and len(shape) == 4:
                    last_conv_layer = layer
                    break
                    
            if not last_conv_layer:
                print("Grad-CAM: No convolutional layer found")
                return None
                
            grad_model = keras.models.Model(
                inputs=[self.model.inputs],
                outputs=[last_conv_layer.output, self.model.output]
            )
            
            img_tensor = tf.cast(img_array, tf.float32)
            
            with tf.GradientTape() as tape:
                # Explicitly watch the input so gradients flow through all layers
                tape.watch(img_tensor)
                conv_outputs, predictions = grad_model(img_tensor)
                tape.watch(conv_outputs)
                if expected_emotion is None:
                    class_idx = tf.argmax(predictions[0])
                else:
                    class_idx = self.emotion_labels.index(expected_emotion)
                loss = predictions[:, class_idx]
                
            grads = tape.gradient(loss, conv_outputs)
            if grads is None:
                print("Grad-CAM: Gradients are None — model layers may be frozen")
                return None
                
            pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
            
            conv_outputs = conv_outputs[0]
            heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
            heatmap = tf.squeeze(heatmap)
            
            # Normalize the heatmap between 0 & 1
            heatmap_max = tf.math.reduce_max(heatmap)
            if heatmap_max == 0:
                return None
            heatmap = tf.maximum(heatmap, 0) / heatmap_max
            return heatmap.numpy()
        except Exception as e:
            print(f"Grad-CAM generation failed: {e}")
            return None
    
    def detect_emotion(self, image_bytes):
        """Detect emotion from image bytes"""
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            return {'emotion': 'Scanning...', 'bbox': None}
        
        # Resize to 640x480 to ensure consistent bbox coordinates
        img = cv2.resize(img, (640, 480))
        
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = self.face_cascade.detectMultiScale(gray, 1.1, 3)
        
        if len(faces) == 0:
            return {'emotion': 'Scanning...', 'bbox': None}
        
        (x, y, w, h) = faces[0]
        # Convert to standard Python types for JSON serialization
        bbox = [int(x), int(y), int(w), int(h)]
        
        face_roi = gray[y:y+h, x:x+w]
        face_roi = cv2.resize(face_roi, (48, 48))
        
        # Convert to 3 channels (RGB) for the Transfer Learning model
        face_roi_rgb = cv2.cvtColor(face_roi, cv2.COLOR_GRAY2RGB)
        face_roi_rgb = face_roi_rgb.astype('float32') / 255.0
        face_roi_rgb = np.expand_dims(face_roi_rgb, axis=0)
        
        predictions = self.model.predict(face_roi_rgb, verbose=0)
        emotion_idx = np.argmax(predictions[0])
        emotion_label = self.emotion_labels[emotion_idx]
        
        # Generate Grad-CAM heatmap
        heatmap_b64 = None
        try:
            import base64
            heatmap = self.generate_gradcam(face_roi_rgb, expected_emotion=None)
            if heatmap is not None:
                # Resize heatmap to match the bounding box size
                heatmap = cv2.resize(heatmap, (w, h))
                # Convert to integer and apply colormap
                heatmap = np.uint8(255 * heatmap)
                heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
                
                # Encode to base64
                _, buffer = cv2.imencode('.jpg', heatmap)
                heatmap_b64 = base64.b64encode(buffer).decode('utf-8')
        except Exception as e:
            print(f"Error generating Grad-CAM: {e}")
            pass
        
        return {
            'emotion': emotion_label,
            'bbox': bbox,
            'heatmap': heatmap_b64
        }
