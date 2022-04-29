const Toast = ({
  children,
  className,
  childClassName,
  type,
  open,
  setOpen,
}: ToastProps) => {
  const typeIcon = (type: any) => {
    switch (type) {
      case "warning":
        return (
          <svg
            className='w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3'
            viewBox='0 0 16 16'>
            <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z' />
          </svg>
        );
      case "error":
        return (
          <svg
            className='w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3'
            viewBox='0 0 16 16'>
            <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z' />
          </svg>
        );
      case "success":
        return (
          <svg
            className='w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3'
            viewBox='0 0 16 16'>
            <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z' />
          </svg>
        );
      default:
        return (
          <svg
            className='w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3'
            viewBox='0 0 16 16'>
            <path d='M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z' />
          </svg>
        );
    }
  };

  const typeColor = (type: any) => {
    switch (type) {
      case "warning":
        return "bg-yellow-100 border-yellow-200 text-yellow-600";
      case "error":
        return "bg-rose-100 border-rose-200 text-rose-600";
      case "success":
        return "bg-emerald-100 border-emerald-200 text-emerald-600";
      default:
        return "bg-indigo-100 border-indigo-200 text-indigo-500";
    }
  };

  return (
    <>
      {open && (
        <div className={className}>
          <div
            className={`inline-flex min-w-80 px-4 py-2 rounded-sm text-sm border ${typeColor(
              type
            )} ${childClassName}`}>
            <div className='flex w-full justify-between items-start'>
              <div className='flex'>
                {typeIcon(type)}
                <div>{children}</div>
              </div>
              <button
                className='opacity-70 hover:opacity-80 ml-3 mt-[3px]'
                onClick={() => setOpen(false)}
                type='button'>
                <div className='sr-only'>Close</div>
                <svg className='w-4 h-4 fill-current'>
                  <path d='M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export type ToastProps = {
  children: any;
  className?: string;
  childClassName?: string;
  type: "warning" | "error" | "success";
  open: boolean;
  setOpen: (state: boolean) => void;
};

export type ToastParams = {
  type: "warning" | "error" | "success";
  message: string;
};

export default Toast;
