import React, { useState, useRef, useEffect } from 'react';
import { useFormStore } from '../../store/formStore';

type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

interface ResizableFieldProps {
  children: React.ReactNode;
  fieldId: string;
  isSelected: boolean;
}

export default function ResizableField({ children, fieldId, isSelected }: ResizableFieldProps) {
  const { updateField } = useFormStore();
  const [isResizing, setIsResizing] = useState(false);
  const [activeHandle, setActiveHandle] = useState<ResizeHandle | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0, width: 0, height: 0, left: 0, top: 0 });

  useEffect(() => {
    if (!isResizing || !activeHandle) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!fieldRef.current) return;

      const deltaX = e.clientX - startPosRef.current.x;
      const deltaY = e.clientY - startPosRef.current.y;
      let newWidth = startPosRef.current.width;
      let newHeight = startPosRef.current.height;
      let newLeft = startPosRef.current.left;
      let newTop = startPosRef.current.top;

      // Handle horizontal resizing
      if (activeHandle.includes('e')) {
        newWidth = Math.max(200, startPosRef.current.width + deltaX);
      } else if (activeHandle.includes('w')) {
        const width = Math.max(200, startPosRef.current.width - deltaX);
        if (width !== startPosRef.current.width) {
          newWidth = width;
          newLeft = startPosRef.current.left + deltaX;
        }
      }

      // Handle vertical resizing
      if (activeHandle.includes('s')) {
        newHeight = Math.max(40, startPosRef.current.height + deltaY);
      } else if (activeHandle.includes('n')) {
        const height = Math.max(40, startPosRef.current.height - deltaY);
        if (height !== startPosRef.current.height) {
          newHeight = height;
          newTop = startPosRef.current.top + deltaY;
        }
      }

      fieldRef.current.style.width = `${newWidth}px`;
      fieldRef.current.style.height = `${newHeight}px`;
      fieldRef.current.style.transform = `translate(${newLeft}px, ${newTop}px)`;
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setActiveHandle(null);
      if (fieldRef.current) {
        const { width, height } = fieldRef.current.getBoundingClientRect();
        updateField(fieldId, {
          width: `${width}px`,
          height: `${height}px`,
        });
        fieldRef.current.style.transform = '';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, activeHandle, fieldId, updateField]);

  const handleResizeStart = (e: React.MouseEvent, handle: ResizeHandle) => {
    e.preventDefault();
    e.stopPropagation();
    if (!fieldRef.current) return;

    const rect = fieldRef.current.getBoundingClientRect();
    setIsResizing(true);
    setActiveHandle(handle);
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height,
      left: 0,
      top: 0,
    };
  };

  const resizeHandleClasses = "absolute w-3 h-3 bg-white border-2 border-indigo-500 opacity-0 group-hover:opacity-100";

  return (
    <div
      ref={fieldRef}
      className={`relative transition-shadow ${isSelected ? 'shadow-md' : ''}`}
      style={{ width: '100%', minWidth: '200px', minHeight: '40px' }}
    >
      {children}
      {isSelected && (
        <>
          {/* Corner handles */}
          <div
            className={`${resizeHandleClasses} top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-nw-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className={`${resizeHandleClasses} top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-ne-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className={`${resizeHandleClasses} bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-sw-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className={`${resizeHandleClasses} bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-se-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />

          {/* Edge handles */}
          <div
            className={`${resizeHandleClasses} top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-n-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className={`${resizeHandleClasses} bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-s-resize`}
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className={`${resizeHandleClasses} left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-w-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className={`${resizeHandleClasses} right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-e-resize`}
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />

          {/* Selection border */}
          <div className="absolute inset-0 border-2 border-indigo-500 pointer-events-none rounded-lg" />
        </>
      )}
    </div>
  );
}