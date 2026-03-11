import tensorflow as tf
import os

model_path = "models/emotion_mobilenet.h5"
tflite_path = "models/emotion_mobilenet.tflite"

print(f"Loading Keras model from {model_path}...")
model = tf.keras.models.load_model(model_path)

print("Converting to TensorFlow Lite...")
converter = tf.lite.TFLiteConverter.from_keras_model(model)
# Optional: Add optimizations to make the model even smaller and faster
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_model = converter.convert()

with open(tflite_path, "wb") as f:
    f.write(tflite_model)

print(f"Successfully converted model to {tflite_path}")
print(f"Size: {os.path.getsize(tflite_path) / (1024*1024):.2f} MB")
