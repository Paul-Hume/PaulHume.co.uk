import { ErrorAlert, LoadingSpinner, PageContentItem } from 'Components';

import styles from './PageContent.module.css';

import { usePageContent } from 'Hooks';
import { PageTag } from 'Types/page.types';

interface PageContentProps {
  pageTag: PageTag,
  className?: string;
}

export const PageContent = ({ pageTag, className = '' }: PageContentProps) => {
  const { data, isLoading, error } = usePageContent({ pageTag });

  if (isLoading) {
    return <LoadingSpinner className={styles['loading-spinner']} />;
  }

  if (error) {
    return <ErrorAlert error="Sorry, there seems to have been an error loading Home Page. Please try again later." />;
  }

  return (
    <section className={className}>
      {data?.items?.map((section, index) => {
        return <PageContentItem key={section.fields.title} content={section.fields} titleType={index > 0 ? 'h4' : undefined} />;
      })}
    </section>
  );
};