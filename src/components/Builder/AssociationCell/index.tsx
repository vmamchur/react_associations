import {
  FC,
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  DragEvent,
} from 'react';

interface IProps {
  label: string;
  onIncrease: () => void;
  onDecrease: () => void;
}

const AssociationCell: FC<IProps> = ({ label, onIncrease, onDecrease }) => {
  const [image, setImage] = useState<File | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];

        setImage(file);
        onIncrease();

        const reader = new FileReader();

        reader.onload = () => {
          setImage(file);
        };

        reader.readAsDataURL(file);
      }
    },
    [onIncrease]
  );

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLButtonElement | HTMLDivElement>) => {
      event.preventDefault();
      setIsDraggingOver(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (event: DragEvent<HTMLButtonElement | HTMLDivElement>) => {
      event.preventDefault();
      setIsDraggingOver(false);
    },
    []
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLButtonElement | HTMLDivElement>) => {
      event.preventDefault();
      setIsDraggingOver(false);

      if (event.dataTransfer.files) {
        const file = event.dataTransfer.files[0];

        setImage(file);
        onIncrease();

        const reader = new FileReader();

        reader.onload = () => {
          setImage(file);
        };

        reader.readAsDataURL(file);
      }
    },
    [onIncrease]
  );

  const handleDelete = useCallback(() => {
    setImage(null);
    onDecrease();
  }, [onDecrease]);

  let content = <h3 className="font-semibold text-2xl">{label}</h3>;

  if (isHovering || isDraggingOver) {
    content = (
      <button
        onClick={handleUploadClick}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="h-full w-full bg-gray-100 text-4xl"
      >
        {isDraggingOver ? '↓' : '+'}
      </button>
    );
  }

  if (image) {
    content = (
      <div className="h-full w-full relative">
        <img
          src={URL.createObjectURL(image)}
          alt={label}
          className="h-full w-full object-cover"
        />
        {isHovering && (
          <button
            onClick={handleDelete}
            className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-red-500 text-9xl"
          >
            <svg
              fill="#ff0000"
              version="1.1"
              width="64px"
              height="64px"
              viewBox="0 0 485 485"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <rect x="67.224" width="350.535" height="71.81" />
                  <path
                    d="M417.776,92.829H67.237V485h350.537V92.829H417.776z M165.402,431.447h-28.362V146.383h28.362V431.447z M256.689,431.447
			              h-28.363V146.383h28.363V431.447z M347.97,431.447h-28.361V146.383h28.361V431.447z"
                  />
                </g>
              </g>
            </svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      onDragOver={handleDragOver}
      className="w-[200px] h-[200px] flex justify-center items-center border"
    >
      {content}
      <input
        onChange={handleUpload}
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image"
      />
    </div>
  );
};

export default AssociationCell;
