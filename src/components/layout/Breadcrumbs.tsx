import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const [isJassWiki, setIsJassWiki] = useState(false);

  useEffect(() => {
    setIsJassWiki(window.location.hostname.includes('jasswiki.ch'));
  }, []);
  
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center gap-0">
        {!isJassWiki && (
          <li className="inline-flex items-center">
            <Link href="/" legacyBehavior>
              <a className="inline-flex items-center text-[14px] leading-[1.4286] font-inter font-medium text-[#b5b5b5] hover:text-[#b5b5b5] transition-colors">
                Home
              </a>
            </Link>
          </li>
        )}
        {items.map((item, index) => (
          <li key={item.href}>
            <div className="flex items-center">
              {(!isJassWiki || index > 0) && (
                <ChevronRight className="h-4 w-4 text-[#b5b5b5] flex-shrink-0" />
              )}
              <Link href={item.href} legacyBehavior>
                <a className={`${(!isJassWiki || index > 0) ? 'ml-[4px]' : ''} text-[14px] leading-[1.4286] font-inter font-medium transition-colors ${
                  index === items.length - 1 
                    ? 'text-[#ff0000]' 
                    : 'text-[#b5b5b5] hover:text-[#b5b5b5]'
                }`}>
                  {item.name}
                </a>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};