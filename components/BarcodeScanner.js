import { useRef, useEffect } from 'react';
import useScanDetection from '../hooks/useScanDetection';

const BarcodeScanner = ({ onScan }) => {
  const scannerRef = useRef(null);

  useScanDetection(scannerRef, onScan);

  useEffect(() => {
    if (scannerRef.current) {
      console.log('Scanner ref is set:', scannerRef.current);
    } else {
      console.error('Scanner ref is not set.');
    }
  }, [scannerRef]);

  return (
    <div className="scanner-container flex items-center justify-center bg-gray-800" style={{ width: '200px', height: '200px' }}>
      <div ref={scannerRef} className="bg-gray-200 border border-gray-400" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default BarcodeScanner;