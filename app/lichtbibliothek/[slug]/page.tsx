import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArticleHero } from "@/components/library/article/ArticleHero";
import { ArticleNavigation } from "@/components/library/article/ArticleNavigation";
import { mdxComponents } from "@/components/library/article/mdxComponents";
import { Section } from "@/components/ui/Section";
import {
  getAdjacentArticles,
  getArticleBySlug,
  getArticleSlugs,
} from "@/lib/content/articles";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.meta.title,
    description: article.meta.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { prev, next } = getAdjacentArticles(slug);

  return (
    <>
      <ArticleHero meta={article.meta} />

      <Section className="pt-0">
        <article className="mx-auto max-w-2xl">
          <MDXRemote source={article.content} components={mdxComponents} />
        </article>
      </Section>

      <ArticleNavigation prev={prev} next={next} />
    </>
  );
}
