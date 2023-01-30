import { Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { LoadingSpinner, PageContentItem } from 'Components';

import styles from './PageContent.module.css';

import { useFetchContentful } from 'Hooks';
import { PageQuery } from 'Queries/page.query';
import { PageSection } from 'Types/page.types';

interface PageContentResponse {
  pageSectionsCollection: {
    total: number;
    items: PageSection[];
  }
}

interface PageContentProps {
  page: 'pageHome',
}

export const PageContent = ({ page }: PageContentProps) => {
  const apiCall = useFetchContentful();

  const query = `
    {
      pageSectionsCollection(
        where: {contentfulMetadata: {tags: {id_contains_some: ["${page}"]}}}
        order: sortOrder_ASC
      ) {
        total
        items {
          ${PageQuery}
        }
      }
    }
  `;

  const fetchPageContent = async () => {
    return apiCall({ query });
  };

  const {isLoading, data, error } = useQuery({ 
    queryKey: ['pageContent', page],
    queryFn: fetchPageContent,
    staleTime: Infinity,
    select: (data: PageContentResponse) => {
      return data?.pageSectionsCollection?.items || [];
    }
  });

  if (isLoading) {
    return <LoadingSpinner className={styles['loading-spinner']} />;
  }

  if (error) {
    return <section className={styles['error-message']}><Alert severity='error'>Sorry, there seems to have been an error loading Home Page. Please try again later.</Alert></section>;
  }

  return (
    <section>
      {data?.map((section, index) => {
        return <PageContentItem key={section.title} content={section} titleType={index > 0 ? 'h4' : undefined} />;
      })}
    </section>
  );
};