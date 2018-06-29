export function getContentUrl(issueNum, title) {
  return `https://metaseed.github.io/iam/doc?id=${issueNum}&title=${encodeURIComponent(title)}`;
}
