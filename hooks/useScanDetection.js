import { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const useScanDetection = (scannerRef, onScan) => {
  const quaggaInitialized = useRef(false);

  useEffect(() => {
    if (!scannerRef.current) {
      console.error('scannerRef.current is null');
      return;
    }

    const playSound = () => {
      const audio = new Audio('/assets/bar.mp3'); // Path to the sound file
      audio.play();
    };

    const checkProductExists = async (code) => {
      try {
        const response = await fetch(`http://localhost/product/products.php?code=${code}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.error) {
          console.log('Fetch error:', result.error);
          return false;
        }
        return true;
      } catch (error) {
        console.error('Fetch error:', error);
        return false;
      }
    };

    const initQuagga = () => {
      if (!scannerRef.current) {
        console.error('scannerRef.current is not available');
        return;
      }

      const config = {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: scannerRef.current,
          constraints: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader'],
        },
      };

      console.log('Initializing Quagga with config:', config);

      if (typeof Quagga === 'undefined') {
        console.error('Quagga is not defined');
        return;
      }

      // Delay initialization slightly to ensure the DOM is ready
      setTimeout(() => {
        try {
          Quagga.init(config, (err) => {
            if (err) {
              console.error('Quagga initialization error:', err);
              return;
            }
            console.log('Quagga initialized successfully');
            Quagga.start();
            quaggaInitialized.current = true; // Mark as initialized
          });

          Quagga.onDetected(async (data) => {
            const code = data.codeResult.code;
            console.log('Detected code:', code);

            const exists = await checkProductExists(code);
            console.log('Product exists:', exists); // Debugging line

            if (exists) {
              playSound();
              onScan(code);
            } else {
              console.log('Barcode not found in the database.');
              // No sound if product is not found
            }
          });
        } catch (error) {
          console.error('Error during Quagga initialization:', error);
        }
      }, 100); // Delay initialization by 100ms
    };

    initQuagga();

    return () => {
      console.log('Stopping Quagga...');
      try {
        if (quaggaInitialized.current) {
          if (typeof Quagga !== 'undefined') {
            Quagga.stop();
            Quagga.offDetected(); // Ensure event listener is removed
          } else {
            console.error('Quagga is not defined during cleanup');
          }
        }
      } catch (error) {
        console.error('Error during Quagga cleanup:', error);
      }
    };
  }, [scannerRef, onScan]);
};

export default useScanDetection;
