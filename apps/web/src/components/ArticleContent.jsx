
import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import pb from '@/lib/pocketbaseClient.js';
import ImageLightbox from './ImageLightbox.jsx';

const ArticleContent = ({ article, onHeadingsExtracted }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // 1. Extract Headings for TOC
    const headingElements = Array.from(contentRef.current.querySelectorAll('h2, h3'));
    const extractedHeadings = headingElements.map((heading, index) => {
      if (!heading.id) {
        // Generate a URL-friendly ID
        const slug = heading.innerText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        heading.id = `heading-${index}-${slug}`;
      }
      return {
        id: heading.id,
        text: heading.innerText,
        level: heading.tagName.toLowerCase()
      };
    });

    if (onHeadingsExtracted) {
      onHeadingsExtracted(extractedHeadings);
    }

    // 2. Setup Image Lightbox
    const images = Array.from(contentRef.current.querySelectorAll('img'));
    const imageObjects = images.map(img => ({
      src: img.src,
      alt: img.alt || article?.title || 'Article image'
    }));

    setLightboxImages(imageObjects);

    const handleImgClick = (index) => (e) => {
      e.preventDefault();
      setLightboxIndex(index);
      setLightboxOpen(true);
    };

    images.forEach((img, index) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', handleImgClick(index));
    });

    return () => {
      images.forEach((img, index) => {
        img.removeEventListener('click', handleImgClick(index));
      });
    };
  }, [article, onHeadingsExtracted]);

  if (!article || !article.content) return null;

  let rawContent = article.content;

  const isHtml = /<(p|div|br|h[1-6]|ul|ol|li|blockquote|pre|table)[^>]*>/i.test(rawContent);

  if (!isHtml) {
    rawContent = rawContent
      .split(/\n\n+/)
      .filter(text => text.trim().length > 0)
      .map(text => `<p>${text.replace(/\n/g, '<br/>')}</p>`)
      .join('');
  }

  const sanitizedContent = DOMPurify.sanitize(rawContent, {
    ADD_TAGS: ['iframe', 'figure', 'figcaption', 'pre', 'code', 'blockquote'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target', 'class', 'spellcheck', 'id']
  });

  return (
    <div className="w-full max-w-[760px] mx-auto">
      <div className="article-body font-sans">
        <style dangerouslySetInnerHTML={{__html: `
          .article-body h2 { font-size: 24px; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; line-height: 1.2; scroll-margin-top: 100px; }
          @media (min-width: 768px) { .article-body h2 { font-size: 28px; margin-top: 2.5rem; margin-bottom: 1.25rem; } }
          
          .article-body h3 { font-size: 18px; font-weight: 600; color: #1f2937; margin-top: 1.5rem; margin-bottom: 0.75rem; scroll-margin-top: 100px; }
          @media (min-width: 768px) { .article-body h3 { font-size: 20px; margin-top: 1.75rem; margin-bottom: 1rem; } }
          
          .article-body p { font-size: 15px; color: #374151; line-height: 1.625; margin-bottom: 1rem; }
          @media (min-width: 768px) { .article-body p { font-size: 16px; margin-bottom: 1.25rem; } }
          
          .article-body ul, .article-body ol { margin-top: 1rem; margin-bottom: 1rem; margin-left: 1.5rem; font-size: 15px; color: #374151; }
          @media (min-width: 768px) { .article-body ul, .article-body ol { margin-top: 1.25rem; margin-bottom: 1.25rem; font-size: 16px; } }
          .article-body ul { list-style-type: disc; }
          .article-body ol { list-style-type: decimal; }
          .article-body li { margin-bottom: 0.5rem; }
          
          .article-body blockquote { border-left: 4px solid #3b82f6; background-color: #f9fafb; padding: 0.75rem 1rem; font-style: italic; color: #374151; margin-top: 1.5rem; margin-bottom: 1.5rem; }
          @media (min-width: 768px) { .article-body blockquote { margin-top: 2rem; margin-bottom: 2rem; } }
          
          .article-body img { max-width: 100%; height: auto; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); margin-top: 1.5rem; margin-bottom: 1.5rem; display: block; }
          @media (min-width: 768px) { .article-body img { margin-top: 2rem; margin-bottom: 2rem; } }
          
          .article-body pre { background-color: #111827; color: #f3f4f6; padding: 1rem; border-radius: 0.5rem; font-family: monospace; font-size: 13px; overflow-x: auto; margin-top: 1.5rem; margin-bottom: 1.5rem; }
          @media (min-width: 768px) { .article-body pre { margin-top: 2rem; margin-bottom: 2rem; } }
          
          .article-body a { color: #2563eb; text-decoration: none; font-weight: 500; }
          .article-body a:hover { text-decoration: underline; }
          .article-body strong { color: #111827; font-weight: 600; }
        `}} />
        <div 
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
        />
      </div>

      {article.image && !article.content.includes(article.image) && (
        <figure className="my-6 md:my-8 flex flex-col items-center w-full group">
          <div 
            className="relative w-full overflow-hidden rounded-lg cursor-zoom-in shadow-md"
            onClick={() => {
              setLightboxImages([{
                src: pb.files.getUrl(article, article.image),
                alt: article.title
              }]);
              setLightboxIndex(0);
              setLightboxOpen(true);
            }}
          >
            <img 
              src={pb.files.getUrl(article, article.image)} 
              alt={article.title} 
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </figure>
      )}

      <ImageLightbox 
        isOpen={lightboxOpen}
        images={lightboxImages}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default ArticleContent;
