import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
from emotion_detection import EmotionDetector

def train_emotion_model():
    print("Preparing to train the Emotion Detection CNN...")
    
    # Initialize the detector to get the model (this creates or loads it)
    detector = EmotionDetector()
    model = detector.model
    
    # Ensure we use the exact label mapping expected by EmotionDetector, otherwise the accuracy will be wrong
    classes = detector.emotion_labels
    
    # Paths - optimized for new dataset structure
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dataset_dir = os.path.join(base_dir, 'dataset')
    train_dir = os.path.join(dataset_dir, 'train')
    test_dir = os.path.join(dataset_dir, 'test')
    
    if not os.path.exists(train_dir) or not os.path.exists(test_dir):
        print(f"Error: train or test directories not found.\nExpected paths:\n- {train_dir}\n- {test_dir}")
        return

    # Image Data Generators
    # Scaling pixel representations to [0,1] since EmotionDetector does this
    # Adding data augmentation over training data to improve accuracy
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=15,
        width_shift_range=0.1,
        height_shift_range=0.1,
        zoom_range=0.1,
        horizontal_flip=True
    )
    
    test_datagen = ImageDataGenerator(rescale=1./255)
    
    batch_size = 64
    target_size = (48, 48)
    
    print("Loading training data...")
    train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=target_size,
        batch_size=batch_size,
        color_mode='rgb',
        class_mode='categorical',
        classes=classes
    )
    
    print("Loading test validation data...")
    validation_generator = test_datagen.flow_from_directory(
        test_dir,
        target_size=target_size,
        batch_size=batch_size,
        color_mode='rgb',
        class_mode='categorical',
        classes=classes
    )
    
    # Callbacks configuration
    os.makedirs('models', exist_ok=True)
    
    checkpoint = ModelCheckpoint(
        'models/emotion_mobilenet.h5',
        monitor='val_accuracy',
        save_best_only=True,
        mode='max',
        verbose=1
    )
    
    early_stop = EarlyStopping(
        monitor='val_accuracy',
        patience=10,
        restore_best_weights=True,
        verbose=1
    )

    epochs = 30
    
    print(f"Starting training for {epochs} epochs...")
    
    try:
        history = model.fit(
            train_generator,
            steps_per_epoch=train_generator.samples // batch_size,
            validation_data=validation_generator,
            validation_steps=validation_generator.samples // batch_size,
            epochs=epochs,
            callbacks=[checkpoint, early_stop]
        )
        print("\n🎉 Training finished! The best model was automatically saved to models/emotion_mobilenet.h5")
    except KeyboardInterrupt:
        print("\n⚠️ Training interrupted. Any previously saved checkpoints will still be retained in the models folder.")

if __name__ == "__main__":
    train_emotion_model()
