import { RenderRichText } from 'Components/RenderRichText';
import { Title } from 'Components/Title';

import { PageSection } from 'Types/page.types';

interface PageContentItemProps {
  content: PageSection;
  titleType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const PageContentItem = ({ content, titleType }: PageContentItemProps) => {
  return (
    <section>
      {content.showTitle && <Title type={titleType} title={content.title} subTitle={content.subTitle} />}

      <RenderRichText content={content.content} />
    </section>
  );
};