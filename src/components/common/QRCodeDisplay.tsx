// ============================================
// QR Code Display Component
// ============================================

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export interface QRCodeDisplayProps {
  value: string;
  size?: number;
  title?: string;
  subtitle?: string;
}

export const QRCodeDisplay = React.memo<QRCodeDisplayProps>(
  ({ value, size = 256, title, subtitle }) => {
    return (
      <div className="flex flex-col items-center">
        {title && (
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        )}
        {subtitle && (
          <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
        )}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <QRCodeSVG
            value={value}
            size={size}
            level="H"
            includeMargin={true}
          />
        </div>
        <p className="mt-4 text-xs text-gray-500 max-w-xs text-center">
          Escanea este código QR para ver los detalles de la compra
        </p>
      </div>
    );
  }
);

QRCodeDisplay.displayName = 'QRCodeDisplay';
