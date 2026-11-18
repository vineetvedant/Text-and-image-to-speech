import React, { useState, useEffect } from 'react';

export default function TopAnnouncementBar() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      let tz = 'LOCAL';
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timeZone.includes('Asia/Kolkata') || timeZone.includes('Calcutta')) {
          tz = 'IST';
        } else if (timeZone.includes('Jakarta') || timeZone.includes('Indonesia')) {
          tz = 'INDONESIAN';
        } else {
          tz = timeZone.split('/')[1]?.replace(/_/g, ' ') || 'LOCAL';
        }
      } catch {
        tz = 'LOCAL';
      }

      setTimeString(`${hours}.${minutes} ${tz.toUpperCase()} TIME`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#f4deb2] dark:bg-[#1e1a12] text-[#3d2f16] dark:text-[#f4deb2] px-3 sm:px-6 py-1.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1 sm:gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold select-none border-b border-[#ebd09b] dark:border-amber-900/30 transition-colors duration-200">
      <div className="flex items-center gap-1.5 truncate">
        <span className="truncate">[ GET 7 DAYS FREE ALL ACCESS ]</span>
      </div>
      <div className="shrink-0 text-[10px] sm:text-[11px]">
        <span>{timeString || '02.15 LOCAL TIME'}</span>
      </div>
    </div>
  );
}
