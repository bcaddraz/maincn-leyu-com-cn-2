const contentMap = {
  siteUrl: "https://maincn-leyu.com.cn",
  keywords: ["乐鱼体育", "赛事资讯", "比分直播", "体育新闻", "运动社区"],
  sections: [
    {
      id: "football",
      label: "足球",
      tags: ["英超", "西甲", "欧冠", "世界杯"],
      items: [
        { title: "英超最新战报", url: "/football/premier-league" },
        { title: "西甲积分榜", url: "/football/la-liga-table" }
      ]
    },
    {
      id: "basketball",
      label: "篮球",
      tags: ["NBA", "CBA", "欧洲联赛"],
      items: [
        { title: "NBA季后赛走势", url: "/basketball/nba-playoffs" },
        { title: "CBA最新排名", url: "/basketball/cba-standings" }
      ]
    },
    {
      id: "esports",
      label: "电竞",
      tags: ["LOL", "DOTA2", "CSGO"],
      items: [
        { title: "英雄联盟赛事", url: "/esports/lol" },
        { title: "DOTA2国际邀请赛", url: "/esports/dota2" }
      ]
    }
  ]
};

function searchContent(query, map) {
  const results = [];
  const q = query.toLowerCase().trim();

  if (!q) return results;

  map.sections.forEach(section => {
    const sectionMatch = section.label.toLowerCase().includes(q) ||
                         section.tags.some(tag => tag.toLowerCase().includes(q));

    const matchingItems = section.items.filter(item => {
      return item.title.toLowerCase().includes(q) ||
             item.url.toLowerCase().includes(q);
    });

    if (sectionMatch && matchingItems.length === 0) {
      matchingItems.push({ title: section.label, url: "#" });
    }

    matchingItems.forEach(item => {
      results.push({
        section: section.label,
        title: item.title,
        url: item.url,
        tags: section.tags
      });
    });
  });

  return results;
}

function filterByTag(tag, map) {
  const results = [];
  const t = tag.toLowerCase().trim();

  map.sections.forEach(section => {
    const hasTag = section.tags.some(sTag => sTag.toLowerCase() === t);
    if (hasTag) {
      section.items.forEach(item => {
        results.push({
          section: section.label,
          title: item.title,
          url: item.url,
          tags: section.tags
        });
      });
    }
  });

  return results;
}

function getKeywords(map) {
  return map.keywords;
}

function getSections(map) {
  return map.sections.map(s => ({
    id: s.id,
    label: s.label,
    tags: s.tags,
    count: s.items.length
  }));
}

function getFullItemList(map) {
  const all = [];
  map.sections.forEach(section => {
    section.items.forEach(item => {
      all.push({
        section: section.label,
        title: item.title,
        url: item.url,
        tags: section.tags
      });
    });
  });
  return all;
}

function displaySearchResults(results) {
  if (results.length === 0) {
    console.log("没有找到匹配的内容。");
    return;
  }
  console.log(`找到 ${results.length} 条结果：`);
  results.forEach((r, i) => {
    console.log(`${i + 1}. [${r.section}] ${r.title} -> ${r.url}`);
  });
}

const sampleQuery = "英超";
const sampleResults = searchContent(sampleQuery, contentMap);
displaySearchResults(sampleResults);

const tagFilter = "NBA";
const tagResults = filterByTag(tagFilter, contentMap);
console.log(`\n标签 "${tagFilter}" 相关文章：`);
tagResults.forEach(r => console.log(`- ${r.title}`));

console.log("\n站点关键词：", getKeywords(contentMap));
console.log("\n内容分区概览：", getSections(contentMap));