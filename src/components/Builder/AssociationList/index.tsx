import { useState, useRef } from 'react';

import cn from 'classnames';
import html2canvas from 'html2canvas';

import AssociationCell from '../AssociationCell';

const associations = [
  'anime/movie',
  'hobby',
  'animal',
  'character',
  'color',
  'place',
  'season',
  'song',
  'food/drink',
];

const AssociationList = () => {
  const [filledAssociationsCount, setFilledAssociationsCount] = useState(0);

  const listRef = useRef<HTMLDivElement | null>(null);

  const increaseFilledAssociationsCount = () => {
    setFilledAssociationsCount((prev) => prev + 1);
  };

  const decreaseFilledAssociationsCount = () => {
    setFilledAssociationsCount((prev) => prev - 1);
  };

  const handleCaptureClick = () => {
    if (listRef.current) {
      html2canvas(listRef.current).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.download = 'associations.png';
        link.href = imageData;
        link.click();
      });
    }
  };

  return (
    <div>
      <div ref={listRef} className="w-[600px] flex flex-wrap relative">
        {associations.map((association) => (
          <AssociationCell
            key={association}
            label={association}
            onIncrease={increaseFilledAssociationsCount}
            onDecrease={decreaseFilledAssociationsCount}
          />
        ))}
        <button
          onClick={handleCaptureClick}
          className={cn('w-full py-3 absolute bottom-[-60px] border text-xl', {
            hidden: filledAssociationsCount !== associations.length,
          })}
        >
          Capture Screenshot 📸
        </button>
      </div>
    </div>
  );
};

export default AssociationList;
