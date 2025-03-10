import React from 'react';
import { Twitter, Github, MessageCircle } from 'lucide-react';

export const SocialLinks: React.FC = () => {
  const socialLinks = [
    {
      icon: Twitter,
      href: 'https://x.com/NeonNexusAgent',
      label: 'Twitter',
      className: 'hover:text-cyan-400'
    },
    // {
    //   icon: MessageCircle,
    //   href: 'https://t.me/SYMBaiEX',
    //   label: 'Telegram',
    //   className: 'hover:text-cyan-400'
    // },
    {
      icon: Github,
      href: 'https://github.com/klingon-droid/NNAgent',
      label: 'GitHub',
      className: 'hover:text-cyan-400'
    }
  ];

  return (
    <div className="flex justify-center gap-4 mt-4">
      {socialLinks.map(({ icon: Icon, href, label, className }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-pink-500 transition-colors ${className}`}
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};