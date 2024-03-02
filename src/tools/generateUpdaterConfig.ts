type LatestGithubReleaseResponse = {
  url: string;
  html_url: string;
  assets_url: string;
  upload_url: string;
  tarball_url: string;
  zipball_url: string;
  discussion_url: string;
  id: number;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  body: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  author: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  assets: {
    url: string;
    browser_download_url: string;
    id: number;
    node_id: string;
    name: string;
    label: string;
    state: string;
    content_type: string;
    size: number;
    download_count: number;
    created_at: string;
    updated_at: string;
    uploader: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
    };
  }[];
};

const { GITHUB_API_URL, GITHUB_REPOSITORY, GITHUB_TOKEN } = process.env;

for (const env of [GITHUB_API_URL, GITHUB_REPOSITORY, GITHUB_TOKEN]) {
  if (!env) throw new Error(`${env} environment variable must be defined`);
}

(async () => {
  const res = await fetch(
    `${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY}/releases/latest`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const latestRelease: LatestGithubReleaseResponse = await res.json();
  const version = latestRelease.tag_name;

  const platformsExtensions: Record<string, string> = {
    "darwin-x86_64": "x86_64.app.tar.gz",
    "darwin-aarch64": "aarch64.app.tar.gz",
    "linux-x86_64": "amd64.AppImage.tar.gz",
    "windows-x86_64": "x64-en-US.msi.zip",
  };

  const configPlatform: Record<string, { signature?: string; url?: string }> =
    {};

  for (const platform in platformsExtensions) {
    const extension = platformsExtensions[platform];
    const platformUrl = latestRelease.assets.find((asset) =>
      asset.name.endsWith(extension),
    )?.browser_download_url;

    const signatureUrl = latestRelease.assets.find((asset) =>
      asset.name.endsWith(`${extension}sig`),
    )?.browser_download_url;
    if (!platformUrl || !signatureUrl) continue;

    const signature = await fetch(signatureUrl).then((r) => r.text());

    configPlatform[platform] = {
      url: platformUrl,
      signature,
    };
  }

  console.log({
    version,
    notes: latestRelease.body
      .replace("See the assets to download this version and install.", "")
      .trim(),
    pub_date: latestRelease.published_at,
    platforms: configPlatform,
  });
})();
