import { Button, Card, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadMore, newsAsync, selectNews, clearNews } from "./newsSlice";
import CountryList from "../../common/components/CountryList";
import NewsCard from "../../common/components/NewsCard";

const NewsList = () => {
  // const [news, setNews] = useState([
  //   {
  //     source: {
  //       id: null,
  //       name: "India.com"
  //     },
  //     author: "India.com Sports Desk",
  //     title:
  //       "LIVE | India vs South Africa Build-up, T20 WC 2022: PAK Fans Pray For Rohit & Co. Ahead of Perth HUMDINGER - India.com",
  //     description:
  //       "India vs South Africa Updates: Follow all LIVE updates. Match starts at 4:30 PM IST. Check LIVE streaming details for Ind vs SA T20 World Cup 2022 match.",
  //     url: "https://www.india.com/sports/india-vs-south-africa-updates-t20-world-cup-2022-super-12-match-30-optus-perth-weather-rain-ind-v-sa-live-streaming-hotstar-4-30-pm-ist-timing-toss-playing-xi-rahul-rohit-kohli-pak-cricket-news-5711481/",
  //     urlToImage:
  //       "https://static.india.com/wp-content/uploads/2022/10/Ind-vs-SA-LIVE-Updates.jpg",
  //     publishedAt: "2022-10-30T08:30:30Z",
  //     content:
  //       "After two wins, India looks good to make it to the semi-final of the ongoing T20 World Cup 2022 in Australia. Ahead of their third game against South Africa on Sunday at Perth, India captain Rohit Sh… [+3199 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Hindustan Times"
  //     },
  //     author: "HT Sports Desk",
  //     title:
  //       "Pakistan vs Netherlands Live score, T20 World Cup 2022: PAK aim to restrict NED under 100, Shadab Khan scalps 3 - Hindustan Times",
  //     description:
  //       "Pakistan vs Netherlands live cricket score, T20 World Cup 2022 today's match: Netherlands find themselves in a difficult position after opting to bat first in the Super 12 encounter against Pakistan. Catch the LIVE updates of PAK vs NED, T20 World Cup 2022:",
  //     url: "https://www.hindustantimes.com/cricket/pakistan-vs-netherlands-live-cricket-score-t20-world-cup-2022-today-match-pak-vs-ned-latest-scorecard-at-perth-stadium-101667105702765.html",
  //     urlToImage:
  //       "https://images.hindustantimes.com/img/2022/10/30/1600x900/CRICKET-WC-2022-T20-PAK-NED-4_1667114146106_1667114146106_1667114166404_1667114166404.jpg",
  //     publishedAt: "2022-10-30T08:28:31Z",
  //     content:
  //       "Pakistan vs Netherlands, T20 World Cup live updates: A quick look at the two squads!Netherlands squad: Vikramjit Singh, Max ODowd, Bas de Leede, Colin Ackermann, Tom Cooper, Scott Edwards(w/c), Tim P… [+403 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "NDTV News"
  //     },
  //     author: null,
  //     title:
  //       '"Want Uniform Civil Code But BJP Is Bluffing": Arvind Kejriwal In Gujarat - NDTV',
  //     description:
  //       "The BJP yesterday said it plans to introduce a Uniform Civil Code -- a contentious issue for Muslims, that does away with religion-based laws.",
  //     url: "https://www.ndtv.com/india-news/want-uniform-civil-code-but-bjp-is-bluffing-aaps-arvind-kejriwal-in-gujarat-3473765",
  //     urlToImage:
  //       "https://c.ndtvimg.com/2022-09/9smvk0k_arvind-kejriwal-in-gujarat-pti-pic_650x400_13_September_22.jpg",
  //     publishedAt: "2022-10-30T08:26:00Z",
  //     content:
  //       "The Congress has also slammed it as a gimmick to shore up votes of the Hindu majority.\r\nNew Delhi: Delhi Chief Minister and Aam Aadmi Party chief Arvind Kejriwal, in Gujarat to campaign for upcoming … [+2331 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "WION"
  //     },
  //     author: "WION Web Team",
  //     title:
  //       "South Korea declares national mourning after 151 killed in Seoul Halloween stampede - WION",
  //     description:
  //       "South Korean President Yoon Suk-yeol has taken cognisance of the tragedy and ordered officials to speedily make medical services available. He also declared a period of national mourning after the Halloween crush killed some 151 people in a packed nightlife a…",
  //     url: "https://www.wionews.com/world/south-korea-around-50-suffer-cardiac-arrest-in-halloween-street-crush-529482",
  //     urlToImage:
  //       "https://cdn.wionews.com/sites/default/files/styles/story_page/public/2022/10/30/307150-haloo.jpg",
  //     publishedAt: "2022-10-30T07:29:36Z",
  //     content:
  //       "South Korean capital Seoul saw dozens of people getting cardiac arrest during Halloween celebrations as thousands crowded narrow streets in the Itaewon neighbourhood. Local authorities have said that… [+2218 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "India.com"
  //     },
  //     author: "Zee Media Bureau",
  //     title:
  //       "Nokia G60 5G launch in India soon; check smartphone`s price, specs & other details - Zee News",
  //     description:
  //       "The Nokia G60 5G is about to be released in India by HDMI Global, a maker of Nokia devices. The business declared that its next 5G phone would be released in India. Its interesting to note that the company also announced that the smartphone would soon be avai…",
  //     url: "https://zeenews.india.com/technology/nokia-g60-5g-launch-in-india-soon-check-smartphones-price-specs-other-details-2528444.html",
  //     urlToImage:
  //       "https://english.cdn.zeenews.com/sites/default/files/2022/10/30/1109929-untitled-design-2022-10-30t125537.129.jpg",
  //     publishedAt: "2022-10-30T07:28:10Z",
  //     content:
  //       "New Delhi: The Nokia G60 5G is about to be released in India by HDMI Global, a maker of Nokia devices. The business declared that its next 5G phone would be released in India. It's interesting to not… [+1782 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "The Indian Express"
  //     },
  //     author: "Tech Desk",
  //     title:
  //       "Injustice 2 to Marvel Snap: 6 new games to play on your iPhone - The Indian Express",
  //     description:
  //       "There are a ton of gaming titles on the App Store and if you're having a hard time deciding what to play next, here's some help",
  //     url: "https://indianexpress.com/article/technology/gaming/injustice-2-to-marvel-snap-6-new-games-to-play-on-your-iphone-8237966/",
  //     urlToImage:
  //       "https://images.indianexpress.com/2022/10/injustice-2-featured1.jpg",
  //     publishedAt: "2022-10-30T07:25:56Z",
  //     content:
  //       "Gaming on mobile devices has come a long way from the early Angry Bird days when you’d have a hard time finding anything that wasn’t arcade, to now where the variety is so huge it’s hard to decide wh… [+4035 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Hindustan Times"
  //     },
  //     author: "HT Tech",
  //     title:
  //       "Last Lunar Eclipse 2022: Know when, where, how to watch Total Chandra Grahan online - HT Tech",
  //     description:
  //       "Want to watch the last total lunar eclipse of 2022? Know when, where and how here.",
  //     url: "https://tech.hindustantimes.com/how-to/last-lunar-eclipse-2022-know-when-where-how-to-watch-total-chandra-grahan-online-71667113614753.html",
  //     urlToImage:
  //       "https://images.hindustantimes.com/tech/img/2022/10/30/1600x900/lunar-eclipse-3945749_1920_1652535285775_1667113710165_1667113710165.jpg",
  //     publishedAt: "2022-10-30T07:11:15Z",
  //     content:
  //       "The month of November will bring you the opportunity to watch the last total lunar eclipse of the year. The event will take place on Tuesday, November 8, 2022. Also, according to NASA, this will be t… [+2157 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "NDTV News"
  //     },
  //     author: null,
  //     title:
  //       "Adani Group To Invest Over $150 Billion In Pursuit Of $1 Trillion Valuation - NDTV Profit",
  //     description:
  //       "Gautam Adani's group will invest over USD 150 billion across businesses ranging from green energy to data centres to airports and healthcare as it chases the dream to join the elite global club of companies with USD 1 trillion valuations.",
  //     url: "https://www.ndtv.com/business/adani-group-to-invest-over-150-billion-in-pursuit-of-1-trillion-valuation-3473672",
  //     urlToImage:
  //       "https://c.ndtvimg.com/2022-10/itm4is2_gautam-adani-getty-650_650x300_19_October_22.jpg",
  //     publishedAt: "2022-10-30T07:04:41Z",
  //     content:
  //       "Adani group plans to invest USD 50-70 billion in green hydrogen business. (File)\r\nNew Delhi: Gautam Adani's group will invest over USD 150 billion across businesses ranging from green energy to data … [+5690 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Hindustan Times"
  //     },
  //     author: "Swati Bhasin",
  //     title:
  //       "'When India was denied space tech…': PM on ISRO feat, increasing self-reliance - Hindustan Times",
  //     description:
  //       "PM Modi said that India was increasingly becoming self-reliant.  | Latest News India",
  //     url: "https://www.hindustantimes.com/india-news/india-emerging-as-strong-player-in-global-commercial-market-pm-on-isro-feat-101667109476319.html",
  //     urlToImage:
  //       "https://images.hindustantimes.com/img/2022/10/30/1600x900/58d292ca-5303-11ed-9b0c-d1cd99c27b9b_1666551059959_1667109998586_1667109998586.jpg",
  //     publishedAt: "2022-10-30T07:01:57Z",
  //     content:
  //       "India is emerging as a strong player in the global commercial market with the latest launch of ISRO (Indian Space Research Organisation), Prime Minister Narendra Modi said on Sunday as he addressed t… [+1684 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "NDTV News"
  //     },
  //     author: "NDTV Sports Desk",
  //     title:
  //       "T20 World Cup, Bangladesh vs Zimbabwe Highlights: Bangladesh Hold Nerve To Defeat Zimbabwe By 3 Runs.. - NDTV Sports",
  //     description:
  //       "T20 World Cup, Bangladesh vs Zimbabwe Highlights: Najmul Hossain Shanto's knock of 71 runs, followed by a three-wicket haul by Taskin Ahmed, guided Bangladesh to a three-run win over Zimbabwe, in their Super 12 clash on ongoing T20 World Cup, at the Gabba, Br…",
  //     url: "https://sports.ndtv.com/t20-world-cup-2022/ban-vs-zim-t20-world-cup-2022-super-12-group-2-bangladesh-vs-zimbabwe-live-score-updates-3472125",
  //     urlToImage:
  //       "https://c.ndtvimg.com/2022-10/9nscb6m_bangladesh-afp-_625x300_30_October_22.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675",
  //     publishedAt: "2022-10-30T06:38:08Z",
  //     content: null
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "NDTV News"
  //     },
  //     author: null,
  //     title:
  //       'Joe Biden Claims There Are "54 States" In US, Remark Shocks Internet - NDTV',
  //     description:
  //       "Joe Biden was delivering a speech at the 'Pennsylvania Democratic Party Reception' on Friday.",
  //     url: "https://www.ndtv.com/world-news/joe-biden-claims-there-are-54-states-in-us-remark-shocks-internet-3473687",
  //     urlToImage:
  //       "https://c.ndtvimg.com/2022-10/oamouql_joe-biden-reuters_625x300_12_October_22.jpg",
  //     publishedAt: "2022-10-30T06:17:58Z",
  //     content:
  //       "Joe Biden claimed that he campaigned in '54 states'\r\nUS President Joe Biden has once again become the topic of discussion on social media for his gaffe. This time, the 79-year-old claimed that he cam… [+2126 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Greatandhra.com"
  //     },
  //     author: "Venkat",
  //     title: "Kondababu Surya Gets Evicted from BB6 Telugu - Greatandhra",
  //     description:
  //       "TV anchor RJ Surya got evicted from the house of Bigg Boss 6 Telugu this weekend. Surya is known for his role as Kondababu in iSmart News on TV9.",
  //     url: "https://www.greatandhra.com/movies/news/kondababu-surya-gets-evicted-from-bb6-telugu-124846",
  //     urlToImage:
  //       "https://www.greatandhra.com/newphotos10/inaya-surya1667108270.jpg",
  //     publishedAt: "2022-10-30T05:37:50Z",
  //     content:
  //       "TV anchor RJ Surya got evicted from the house of “Bigg Boss 6 Telugu” this weekend. Surya is known for his role as Kondababu in “iSmart News” on TV9.\r\nAlong with another anchor Arohi Rao, Surya came … [+364 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Scroll.in"
  //     },
  //     author: "Scroll Staff",
  //     title:
  //       "‘The Wire’ files police complaint against researcher Devesh Kumar over Meta articles - Scroll.in",
  //     description:
  //       "The development was confirmed by Siddharth Varadarajan, one of the founding editors of ‘The Wire’.",
  //     url: "https://scroll.in/latest/1036179/the-wire-files-police-complaint-against-researcher-devesh-kumar-over-meta-articles",
  //     urlToImage:
  //       "https://s01.sgp1.cdn.digitaloceanspaces.com/book/170598-irkedgrpxy-1645711590.jpeg",
  //     publishedAt: "2022-10-30T05:21:00Z",
  //     content:
  //       "News website The Wire has filed a police complaint against their researcher Devesh Kumar, who worked on a series of articles about social media company Meta, editor Siddharth Varadarajan confirmed to… [+2212 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "The Indian Express"
  //     },
  //     author: "Reuters",
  //     title:
  //       "As InSight lander nears end, NASA details meteorite strike on Mars - The Indian Express",
  //     description:
  //       "InSight's mission, which has helped reveal the internal structure of Mars and its seismic activity, originally was planned for two years but was extended to four. When the power runs out, NASA will lose contact with InSight.",
  //     url: "https://indianexpress.com/article/technology/science/nasa-insight-mission-mars-meteorite-8237954/",
  //     urlToImage:
  //       "https://images.indianexpress.com/2022/10/NASA-InSight-20221030.jpg",
  //     publishedAt: "2022-10-30T05:15:49Z",
  //     content:
  //       "The InSight lander, perched on the surface of Mars since 2018, will run out of power and stop operations within four to eight weeks, NASA said on Thursday, even as scientists detailed a big meteorite… [+4144 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Moneycontrol"
  //     },
  //     author: "PTI",
  //     title:
  //       "Maruti Suzuki recalls 9,925 units of three models to rectify possible defect in brake assembly - Moneycontrol",
  //     description:
  //       "Considering the safety of customers and out of abundant precaution, the company has decided to recall the suspected vehicles for inspection and replacement of the faulty part, free of cost.",
  //     url: "https://www.moneycontrol.com/news/business/maruti-suzuki-recalls-9925-units-3-models-to-rectify-possible-defect-in-brake-assembly-9412261.html",
  //     urlToImage:
  //       "https://images.moneycontrol.com/static-mcnews/2022/06/Car-making-factory-770x433.jpg",
  //     publishedAt: "2022-10-30T04:34:48Z",
  //     content:
  //       "Maruti Suzuki India Ltd is recalling 9,925 units of its three models, Wagon R, Celerio and Ignis, to rectify a possible defect in rear brake assembly pin, according to a regulatory filing by the comp… [+787 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Deccan Chronicle"
  //     },
  //     author: "Deccan Chronicle",
  //     title: "Free stroke screening at Medicover Hospital - Deccan Chronicle",
  //     description:
  //       "It includes CT scan brain (screening only) and neurologist consultation",
  //     url: "https://www.deccanchronicle.com/nation/in-other-news/301022/free-stroke-screening-at-medicover-hospital.html",
  //     urlToImage:
  //       "https://s3.ap-southeast-1.amazonaws.com/images.deccanchronicle.com/dc-Cover-dcs64172qhlr1l4guooi5d4fq1-20191029014907.Medi.jpeg",
  //     publishedAt: "2022-10-30T04:34:00Z",
  //     content:
  //       "HYDERABAD: Begumpet Medicover Hospitals said it is offering a free stroke screening package worth Rs 7,000 on World Brain Stroke Day from Saturday.\r\nThe package was released by the Indian Medical Ass… [+1045 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Hindustan Times"
  //     },
  //     author: "Pathi Venkata Thadhagath",
  //     title:
  //       "'Scotch, wristwatch...': Cong lists out items in alleged 'bribe box' to journos - Hindustan Times",
  //     description:
  //       "The state unit of Congress asked what else is included in the gift pack to woo the journalists apart from cash, scotch bottles, wristwatches and gold coins. | Bengaluru News",
  //     url: "https://www.hindustantimes.com/cities/bengaluru-news/scotch-wristwatch-cong-lists-out-items-in-alleged-bribe-box-to-journos-101667103681592.html",
  //     urlToImage:
  //       "https://images.hindustantimes.com/img/2022/10/30/1600x900/FgOcsufaMAEWg_q_1667103743366_1667103759158_1667103759158.jpg",
  //     publishedAt: "2022-10-30T04:27:19Z",
  //     content:
  //       "After allegations that Karnataka Chief Minister's Office sent cash as Diwali gift to journalists, Karnataka Congress now slammed the ruling party for including scotch bottles inside the gift packs. T… [+2552 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "India Today"
  //     },
  //     author: "Supriya Bhardwaj",
  //     title:
  //       "Ready, steady, sprint. Rahul Gandhi’s Bharat Jodo speeds up and how in Telangana | Video - India Today",
  //     description:
  //       "A video of Rahul Gandhi running with Congress leaders during Bharat Jodo Yatra is going viral on social media. This is the fifth day of the party's foot march in Telangana.",
  //     url: "https://www.indiatoday.in/india/story/rahul-gandhi-sprint-congress-leaders-bharat-jodo-yatra-telangana-video-2291029-2022-10-30",
  //     urlToImage:
  //       "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202210/fgsq8hhviaaexg3-sixteen_nine.jpg?VersionId=UiraYysEkM2Ky_kQhJ.NDpZl.W9BtzWM",
  //     publishedAt: "2022-10-30T04:07:43Z",
  //     content:
  //       "By Supriya Bhardwaj: The Congress's Bharat Jodo Yatra has served up several viral photos and videos. Here's another. Rahul Gandhi, former party president, participating in a race with leaders amid lo… [+3504 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "Livemint"
  //     },
  //     author: "Livemint",
  //     title:
  //       "Banks hike FD rates: 4 banks offer more than 7% interest rate on fixed deposits | Mint - Mint",
  //     description:
  //       "Banks have been hiking the interest rates on fixed deposits (FDs) and savings accounts since May 2022",
  //     url: "https://www.livemint.com/money/personal-finance/banks-hike-fd-rates-4-banks-offer-more-than-7-interest-rate-on-fixed-deposits-11667099808880.html",
  //     urlToImage:
  //       "https://images.livemint.com/img/2022/10/30/600x338/Fixed_deposit_rates_1561114822692_1667101585415_1667101585415.jpg",
  //     publishedAt: "2022-10-30T03:47:09Z",
  //     content:
  //       "After consecutive repo rate hikes by the Reserve Bank of India (RBI), banks have been hiking the interest rates on fixed deposits (FDs) and savings accounts since May 2022. The State Bank of India (S… [+1895 chars]"
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "News18"
  //     },
  //     author: "Rupashree Nanda",
  //     title:
  //       "Aam Aadmi Party's 'Name Your CM' Game Plan Has 1 Hit, 2 Misses So Far. Will Gujarat Play Ball? - News18",
  //     description:
  //       "Gujarat elections: AAP strategists believe going to elections with a declared name for chief minister would bolster its chances by instilling confidence amongst people. The strategy, however, had worked in Punjab but did not yield results in Goa and Uttarakha…",
  //     url: "https://www.news18.com/news/elections/aam-aadmi-partys-name-your-cm-game-plan-has-1-hit-2-misses-so-far-will-gujarat-play-ball-6268135.html",
  //     urlToImage:
  //       "https://images.news18.com/ibnlive/uploads/2022/10/arvind-kejriwal-166705082916x9.png",
  //     publishedAt: "2022-10-30T03:39:32Z",
  //     content:
  //       "Addressing a press conference in Surat, AAP chief Arvind Kejriwal released a phone number and an email ID for the people of Gujarat to indicate their preferred name for AAPs chief ministerial candida… [+3660 chars]"
  //   }
  // ]);
  const [country, setCountry] = useState("in");
  const { news, totalCount, page, status } = useSelector(selectNews);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(clearNews());
  }, [params, country]);
  useEffect(() => {
    const query = params.query || "";
    dispatch(newsAsync({ query, page, country }));
  }, [params, country, page]);
  return (
    <Container pt={2}>
      {params.query && params.query !== "" && (
        <Typography gutterBottom variant="h4" component="h2">
          Search result for "{params.query}"
        </Typography>
      )}
      <Grid container spacing={2}>
        <CountryList country={country} setCountry={setCountry} />
        {news && news.length > 0 ? (
          <>
            {news.map((item) => (
              <NewsCard key={item.title} item={item} />
            ))}
            {totalCount > news.length && (
              <Grid item md={12} variant={Card} p={2} textAlign={"center"}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => dispatch(loadMore())}>
                  Load More
                </Button>
              </Grid>
            )}
          </>
        ) : (
          <Grid item xs={12}>
            <Typography>
              {status === "idle" ? "No News Found" : "Loading..."}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
export default NewsList;
