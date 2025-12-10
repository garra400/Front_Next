// Reusable Card Component
import React from 'react';
import Link from 'next/link';

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ 
  title, 
  description, 
  children, 
  href, 
  icon,
  className = '',
  hover = true 
}: CardProps) {
  const baseStyles = 'bg-white rounded-lg shadow-md p-6 border border-gray-200';
  const hoverStyles = hover ? 'transition-all duration-200 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1' : '';
  
  const content = (
    <>
      {icon && (
        <div className="mb-4 text-primary">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      )}
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}
      {children}
    </>
  );
  
  if (href) {
    return (
      <Link href={href} className={`block ${baseStyles} ${hoverStyles} ${className}`}>
        {content}
      </Link>
    );
  }
  
  return (
    <div className={`${baseStyles} ${className}`}>
      {content}
    </div>
  );
}
