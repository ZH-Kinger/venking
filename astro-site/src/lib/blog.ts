// 博客数据层:集中封装文章查询/分类树/上下篇。全部 build 期跑,零运行时开销。
// 关键(planner 取证):分类按 frontmatter 的 data.category 分组,不是目录路径。
import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

// 统一排序:date 不可靠(迁移全是导入日),按标题中文排序。列表/侧栏/上下篇三处共用。
const byTitle = (a: Post, b: Post) => a.data.title.localeCompare(b.data.title, "zh");

/** 已发布文章(排除 draft),按标题排序。 */
export async function getPublishedPosts(): Promise<Post[]> {
  const all = await getCollection("posts", (p) => !p.data.draft);
  return all.sort(byTitle);
}

export interface CategoryNode {
  name: string;          // 分类显示名(中文)
  count: number;
  posts: Post[];
}

/** 分类树:按 data.category[0](多分类归首个)分组,按篇数降序。 */
export async function getCategoryTree(): Promise<CategoryNode[]> {
  const posts = await getPublishedPosts();
  const map = new Map<string, Post[]>();
  for (const p of posts) {
    const cat = p.data.category?.[0] || "未分类";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(p);
  }
  return [...map.entries()]
    .map(([name, posts]) => ({ name, count: posts.length, posts }))
    .sort((a, b) => b.count - a.count);
}

/** 同分类内的上一篇/下一篇(按同一排序取相邻)。 */
export async function getAdjacentPosts(current: Post): Promise<{ prev: Post | null; next: Post | null }> {
  const posts = await getPublishedPosts();
  const cat = current.data.category?.[0] || "未分类";
  const inCat = posts.filter((p) => (p.data.category?.[0] || "未分类") === cat);
  const i = inCat.findIndex((p) => p.id === current.id);
  return {
    prev: i > 0 ? inCat[i - 1] : null,
    next: i >= 0 && i < inCat.length - 1 ? inCat[i + 1] : null,
  };
}
