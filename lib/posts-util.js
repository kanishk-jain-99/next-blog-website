import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes extension

  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = { slug: postSlug, ...data, content };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();
  const allPosts = postFiles
    .map((postFile) => {
      return getPostData(postFile);
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return allPosts;
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.isFeatured);
}
