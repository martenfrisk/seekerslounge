const fs = require("fs");
// const { MeiliSearch } = require("meilisearch");
// const { v4: uuidv4 } = require("uuid");
const urls = require("./urls2.json");
const eplist = require("./src/assets/episodes.json");

const fn = async () => {
  const eps = [];
  eplist.forEach((ep) => {
    //   const epname = Object.values(ep)[0].replace('/show/big-grandes-teachers-lounge/episode/', '').replaceAll('-', ' ')
    //   let dateextract = ''
    //   if (epname.match(/([0-9])\w+/g)) {
    //     dateextract = epname.match(/([0-9])\w+/g)[0]
    //   }
    //   console.log(epname)

    //   const obj = {
    //     url: `https://stitcher.com${Object.values(ep)[0]}`,
    //     ep: epname,
    //     date: dateextract
    //   }
    //   console.log(obj)

    //   eps.push(obj)
    // })
    // const epname = ep.title
    //   .replace("-", "")
    //   .toLowerCase()
    //   .replace(
    //     /\s(\([a-z]+(\.)?\s[a-z]+(\.)?(\s[a-z]+(\.)?)?(\s[a-z]+(\.)?)?(\s[a-z]+(\.)?)?\))+/g,
    //     ""
    //   );

    // const matching = urls.find((x) => x.ep.match(epname))?.url;
    let season
    if (ep.ep.includes('mini')) {
       season = 'Mini'
    } else {
      season = ep.ep.slice(1, 3)
    }
    const obj = {
      season,
      ...ep
    };
    eps.push(obj);
  });
  eps.sort((a, b) => a.ep.localeCompare(b.ep));
  fs.writeFileSync("./urls4.json", JSON.stringify(eps));
};
fn();
