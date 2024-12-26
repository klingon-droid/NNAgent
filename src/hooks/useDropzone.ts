import { useRef, useState, useCallback, useEffect } from 'react';

interface DropzoneOptions {
  accept?: string[];
}

export const useDropzone = (onDrop: (files: FileList | null) => void, options: DropzoneOptions = {}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const dragCounter = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    dragCounter.current = 0;

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files;
      
      // Check file type if accept is specified
      if (options.accept) {
        const file = files[0];
        const isAccepted = options.accept.some(type => 
          file.name.toLowerCase().endsWith(type.toLowerCase())
        );
        if (!isAccepted) {
          console.warn('File type not accepted');
          return;
        }
      }
      
      onDrop(files);
      e.dataTransfer.clearData();
    }
  }, [onDrop, options.accept]);

  const elementRef = useRef<HTMLElement | null>(null);

  const dragRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
    
    // Create hidden file input if it doesn't exist
    if (node && !inputRef.current) {
      const input = document.createElement('input');
      input.type = 'file';
      input.style.display = 'none';
      if (options.accept) {
        input.accept = options.accept.join(',');
      }
      input.onchange = (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files?.length) {
          onDrop(files);
        }
        // Reset input value to allow selecting same file again
        input.value = '';
      };
      node.appendChild(input);
      inputRef.current = input;
    }
  }, [handleDragIn, handleDragOut, handleDrag, handleDrop]);

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('dragenter', handleDragIn);
    element.addEventListener('dragleave', handleDragOut);
    element.addEventListener('dragover', handleDrag);
    element.addEventListener('drop', handleDrop);

    return () => {
      element.removeEventListener('dragenter', handleDragIn);
      element.removeEventListener('dragleave', handleDragOut);
      element.removeEventListener('dragover', handleDrag);
      element.removeEventListener('drop', handleDrop);
    };
  }, [handleDragIn, handleDragOut, handleDrag, handleDrop]);

  return {
    isDragActive,
    dragRef,
    openFileDialog
  };
};