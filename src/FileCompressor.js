import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useSpring, animated } from '@react-spring/web';

const FileCompressor = () => {
  const [files, setFiles] = useState([]);
  const [isEating, setIsEating] = useState(false);
  const [isPooping, setIsPooping] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const compressFiles = async () => {
    setIsEating(true);
    setTimeout(async () => {
      const zip = new JSZip();
      files.forEach((file) => {
        zip.file(file.name, file);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'compressed_files.zip');
      setIsEating(false);
      setIsPooping(true);
      setTimeout(() => setIsPooping(false), 2000);
    }, 2000); // Simulate eating time
  };

  const eatingAnimation = useSpring({
    transform: isEating ? 'scale(1.2)' : 'scale(1)',
    config: { duration: 200 },
  });

  const poopingAnimation = useSpring({
    opacity: isPooping ? 1 : 0,
    config: { duration: 500 },
  });

  return (
    <div>
      <h2>FEED ME!</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={compressFiles}>Compress Files</button>
      <animated.div style={eatingAnimation} className="monster">
        🐲 Eating...
      </animated.div>
      <animated.div style={poopingAnimation} className="poop">
        💩 Compressed File Ready!
      </animated.div>
    </div>
  );
};

export default FileCompressor;
