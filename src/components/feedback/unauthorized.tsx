import React from 'react';
import { useNavigate } from 'react-router';
import { ShieldAlert, ArrowLeft, House } from 'lucide-react';

interface UnauthorizedProps {
  title?: string;
  message?: string;
  homePath?: string;
}

export const Unauthorized: React.FC<UnauthorizedProps> = ({
  title = "Access Denied",
  message = "You don't have permission to access this page. If you believe this is an error, please contact the administration.",
  homePath = "/",
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-md">
        
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <ShieldAlert className="h-8 w-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {message}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-neutral-100 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Return
          </button>

          <button
            type="button"
            onClick={() => navigate(homePath)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e36f3c] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#c05f32]"
          >
            <House className="h-4 w-4" />
            Go Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default Unauthorized;