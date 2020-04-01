/* eslint-disable spaced-comment */
(function() {
  var confiantGlobal = window.confiant || (window.confiant = {});
  var integrationSetting = {
    config_ver: '202003311730',
    integration_type: 'gpt_and_prebid',
    prebid_integration_version: confiantGlobal.prebid_integration_version || '202003301902',
    gpt_integration_version: confiantGlobal.gpt_integration_version || '202003301902',
    c_integration_version: confiantGlobal.c_integration_version || '202003181643',
    cdt_version: '202003171135',
    exec_test_ver: null,
  };
  function defaultCallback() {
    console.log('Confiant: ad blocked', arguments);
  };
  var settings = {
    propertyId: '7oDgiTsq88US4rrBG0_Nxpafkrg',
    adServer: 'https://protected-by.clarium.io',
    confiantCdn: 'confiant-integrations.global.ssl.fastly.net',
    mapping: 'W3siaSI6MiwidCI6Int7b319Ont7d319eHt7aH19IiwicCI6MCwiRCI6MSwiciI6W119LHsiaSI6NiwidCI6Int7Y299fTp7e3d9fXh7e2h9fSIsInAiOjUwLCJEIjowLCJyIjpbeyJ0IjoiZXgiLCJzIjpudWxsLCJ2IjoiY28ifV19XQ==',
    rules: {"du":0,"rs":1,"v":6,"m":[{"r":[{"d":"tpc.googlesyndication.com","l":[{"oi":"3m43d3","ot":2,"rs":1,"s":["/4399795184135197618"]}]},{"d":"adsrvr.org","l":[{"oi":"0rdij3","ot":2,"rs":0,"s":["crid=f7jqc5h9"]},{"oi":"hbgxj3","ot":2,"rs":0,"s":["crid=hvxuw2da"]},{"oi":"mvzrl3","ot":2,"rs":0,"s":["crid=p7uyww7h"]}]},{"d":"ads.w55c.net","l":[{"oi":"g3umk3","ot":2,"rs":0,"s":["ci=XmvB09Q5XU"]}]},{"d":"tags.mathtag.com","l":[{"oi":"i2zrk3","ot":2,"rs":0,"s":["cid=7754658"]}]},{"d":"bs.serving-sys.com","l":[{"oi":"gcbrl3","ot":2,"rs":1,"s":["pli=1075397060"]}]},{"d":"hal9000.redintelligence.net","l":[{"oi":"c1zrl3","ot":2,"rs":0,"s":["/wz5hnow640j2"]}]},{"d":"adform.net","l":[{"oi":"w2zrl3","ot":2,"rs":0,"s":["?bn=36552380"]}]},{"d":"affiliateempire.net","l":[{"oi":"j1","ot":3,"rs":1}]},{"d":"morrisonshomeimprovement.com","l":[{"oi":"32","ot":3,"rs":1}]},{"d":"filmfanatic.com","l":[{"oi":"n8","ot":3,"rs":1}]},{"d":"ilividnewtab.com","l":[{"oi":"o9","ot":3,"rs":1}]},{"d":"www.youradexchange.com","l":[{"oi":"ki","ot":3,"rs":1}]},{"d":"cured.com","l":[{"oi":"ym","ot":3,"rs":1}]},{"d":"tradeadexchange.com","l":[{"oi":"in","ot":3,"rs":1}]},{"d":"liveadexchanger.com","l":[{"oi":"ln","ot":3,"rs":1}]},{"d":"yahlabs.com","l":[{"oi":"fs","ot":3,"rs":1}]},{"d":"adpub24.com","l":[{"oi":"bu","ot":3,"rs":1}]},{"d":"ads.jinkads.com","l":[{"oi":"dr1","ot":3,"rs":1}]},{"d":"icanhazip.com","l":[{"oi":"tr1","ot":3,"rs":1}]},{"d":"www.mapsgalaxy.com","l":[{"oi":"nv1","ot":3,"rs":1}]},{"d":"download.televisionfanatic.com","l":[{"oi":"ew1","ot":3,"rs":1}]},{"d":"ulinkths.com","l":[{"oi":"nw1","ot":3,"rs":1}]},{"d":"adwidecenter.com","l":[{"oi":"a32","ot":3,"rs":1}]},{"d":"track.hexcan.com","l":[{"oi":"s52","ot":3,"rs":1}]},{"d":"eland-tech.com","l":[{"oi":"aa2","ot":3,"rs":1}]},{"d":"datingfactory.com","l":[{"oi":"um2","ot":3,"rs":1}]},{"d":"driverupdate.net","l":[{"oi":"no2","ot":3,"rs":1}]},{"d":"advertsby.com","l":[{"oi":"eq2","ot":3,"rs":1}]},{"d":"56txs4.com","l":[{"oi":"wy2","ot":3,"rs":1}]},{"d":"ads2fast.com","l":[{"oi":"853","ot":3,"rs":1}]},{"d":"lzjl.com","l":[{"oi":"x83","ot":3,"rs":1}]},{"d":"fritt-val.se","l":[{"oi":"vb3","ot":3,"rs":1}]},{"d":"d3qxwzhswv93jk.cloudfront.net","l":[{"oi":"zb3","ot":3,"rs":1}]},{"d":"toutiao.com ","l":[{"oi":"td3","ot":3,"rs":1}]},{"d":"one-tap.co","l":[{"oi":"9e3","ot":3,"rs":1}]},{"d":"bnserving.com","l":[{"oi":"yn3","ot":3,"rs":1}]},{"d":"webturbo.me","l":[{"oi":"ot3","ot":3,"rs":1}]},{"d":"almongkingstory.com","l":[{"oi":"404","ot":3,"rs":1}]},{"d":"sevmob.com","l":[{"oi":"254","ot":3,"rs":1}]},{"d":"d33t3vvu2t2yu5.cloudfront.net","l":[{"oi":"454","ot":3,"rs":1}]},{"d":"forkcdn.com","l":[{"oi":"554","ot":3,"rs":1}]},{"d":"oclasrv.com","l":[{"oi":"i54","ot":3,"rs":1}]},{"d":"adnetworkperformance.com","l":[{"oi":"gb4","ot":3,"rs":1}]},{"d":"davebestdeals.com","l":[{"oi":"yg4","ot":3,"rs":1}]},{"d":"ylx-1.com","l":[{"oi":"zk4","ot":3,"rs":1}]},{"d":"popmarker.com","l":[{"oi":"tl4","ot":3,"rs":1}]},{"d":"aws-ajax.com","l":[{"oi":"8n4","ot":3,"rs":1}]},{"d":"7bam.com","l":[{"oi":"7o4","ot":3,"rs":1}]},{"d":"clou.im","l":[{"oi":"8o4","ot":3,"rs":1}]},{"d":"adhunter.media","l":[{"oi":"ts4","ot":3,"rs":1}]},{"d":"video2mp3.at","l":[{"oi":"ot4","ot":3,"rs":1}]},{"d":"apk-dl.com","l":[{"oi":"pv4","ot":3,"rs":1}]},{"d":"tr563.com","l":[{"oi":"xx4","ot":3,"rs":1}]},{"d":"cloudz.im","l":[{"oi":"815","ot":3,"rs":1}]},{"d":"adlook.me","l":[{"oi":"d15","ot":3,"rs":1}]},{"d":"edgedatg.com","l":[{"oi":"l35","ot":3,"rs":1}]},{"d":"tippshero.de","l":[{"oi":"w45","ot":3,"rs":1}]},{"d":"5candiesaweek.com","l":[{"oi":"855","ot":3,"rs":1}]},{"d":"mysupermarket.co.uk","l":[{"oi":"785","ot":3,"rs":1}]},{"d":"lifeblooddonation.com","l":[{"oi":"ha5","ot":3,"rs":1}]},{"d":"search-goo.com","l":[{"oi":"hb5","ot":3,"rs":1}]},{"d":"andbeyond.media","l":[{"oi":"xb5","ot":3,"rs":1}]},{"d":"totalmotorcycle.com","l":[{"oi":"he5","ot":3,"rs":1}]},{"d":"adslivecorp.com","l":[{"oi":"jh5","ot":3,"rs":1}]},{"d":"longchampoutlet.net.co","l":[{"oi":"y26","ot":3,"rs":1}]},{"d":"cloudapi.online","l":[{"oi":"836","ot":3,"rs":1}]},{"d":"freemaineads.com","l":[{"oi":"n46","ot":3,"rs":1}]},{"d":"franecki.net","l":[{"oi":"076","ot":3,"rs":1}]},{"d":"tvigle.ru","l":[{"oi":"o76","ot":3,"rs":1}]},{"d":"chrome.java-api-update.com","l":[{"oi":"g86","ot":3,"rs":1}]},{"d":"dailylifetech.com","l":[{"oi":"k86","ot":3,"rs":1}]},{"d":"vidgyor.com","l":[{"oi":"qe6","ot":3,"rs":1}]},{"d":"n161adserv.com","l":[{"oi":"af6","ot":3,"rs":1}]},{"d":"huoshanzhibo.com","l":[{"oi":"7i6","ot":3,"rs":1}]},{"d":"dtrk.slimcdn.com","l":[{"oi":"8n6","ot":3,"rs":1}]},{"d":"amediateka.ru","l":[{"oi":"ds6","ot":3,"rs":1}]},{"d":"a2gw.com","l":[{"oi":"et6","ot":3,"rs":1}]},{"d":"viva-images.com","l":[{"oi":"ku6","ot":3,"rs":1}]},{"d":"velocecdn.com","l":[{"oi":"rx6","ot":3,"rs":1}]},{"d":"coin-hive.com","l":[{"oi":"vx6","ot":3,"rs":1}]},{"d":"coinhive.com","l":[{"oi":"a17","ot":3,"rs":1}]},{"d":"mynewrotationurl.com","l":[{"oi":"627","ot":3,"rs":1}]},{"d":"s-newviraloffers.com","l":[{"oi":"m27","ot":3,"rs":1}]},{"d":"dskrt.net","l":[{"oi":"j37","ot":3,"rs":1}]},{"d":"jsecoin.com","l":[{"oi":"377","ot":3,"rs":1}]},{"d":"refbanners.website","l":[{"oi":"997","ot":3,"rs":1}]},{"d":"d3go.com","l":[{"oi":"ea7","ot":3,"rs":1}]},{"d":"my-app-analytics.com","l":[{"oi":"pa7","ot":3,"rs":1}]},{"d":"cpi-offers.com","l":[{"oi":"am7","ot":3,"rs":1}]},{"d":"stats-ex-serving.com","l":[{"oi":"0n7","ot":3,"rs":1}]},{"d":"highratedads.com","l":[{"oi":"ho7","ot":3,"rs":1}]},{"d":"mylivechat.com","l":[{"oi":"aq7","ot":3,"rs":1}]},{"d":"authedmine.com","l":[{"oi":"wr7","ot":3,"rs":1}]},{"d":"connectignite.com","l":[{"oi":"1s7","ot":3,"rs":1}]},{"d":"supermario.xyz","l":[{"oi":"mv7","ot":3,"rs":1}]},{"d":"adplugg.com","l":[{"oi":"zv7","ot":3,"rs":1}]},{"d":"adplugg.io","l":[{"oi":"0w7","ot":3,"rs":1}]},{"d":"seasoncare.info","l":[{"oi":"ix7","ot":3,"rs":1}]},{"d":"popmyads.com","l":[{"oi":"rz7","ot":3,"rs":1}]},{"d":"d2kz60b0gq4lg.cloudfront.net","l":[{"oi":"x78","ot":3,"rs":1}]},{"d":"voog.com","l":[{"oi":"s88","ot":3,"rs":1}]},{"d":"limeroad.com","l":[{"oi":"m98","ot":3,"rs":1}]},{"d":"d12xoj7p9moygp.cloudfront.net","l":[{"oi":"ma8","ot":3,"rs":1}]},{"d":"pulseadnetwork.com","l":[{"oi":"ta8","ot":3,"rs":1}]},{"d":"adx1js.s3.amazonaws.com","l":[{"oi":"9b8","ot":3,"rs":1}]},{"d":"yolacdn.net","l":[{"oi":"7c8","ot":3,"rs":1}]},{"d":"xcdnpro.com","l":[{"oi":"be8","ot":3,"rs":1}]},{"d":"dealslands.co.uk","l":[{"oi":"ve8","ot":3,"rs":1}]},{"d":"optinmonster.com","l":[{"oi":"cg8","ot":3,"rs":1}]},{"d":"ageverify.co","l":[{"oi":"hg8","ot":3,"rs":1}]},{"d":"mobpushup.com","l":[{"oi":"sh8","ot":3,"rs":1}]},{"d":"spicegems.com","l":[{"oi":"di8","ot":3,"rs":1}]},{"d":"ittechzilla.com","l":[{"oi":"ei8","ot":3,"rs":1}]},{"d":"fits.me","l":[{"oi":"fi8","ot":3,"rs":1}]},{"d":"spinasale.com","l":[{"oi":"gi8","ot":3,"rs":1}]},{"d":"instashopapp.com","l":[{"oi":"ii8","ot":3,"rs":1}]},{"d":"storepickup.io","l":[{"oi":"li8","ot":3,"rs":1}]},{"d":"conversio.com","l":[{"oi":"mi8","ot":3,"rs":1}]},{"d":"lifterapps.com","l":[{"oi":"ni8","ot":3,"rs":1}]},{"d":"nulls.solutions","l":[{"oi":"oi8","ot":3,"rs":1}]},{"d":"freecontent.bid","l":[{"oi":"tl8","ot":3,"rs":1}]},{"d":"sync-srv.com","l":[{"oi":"bz8","ot":3,"rs":1}]},{"d":"reklamselfie.com","l":[{"oi":"i59","ot":3,"rs":1}]},{"d":"d2vxvnufz8f5c5.cloudfront.net","l":[{"oi":"w69","ot":3,"rs":1}]},{"d":"selectablemedia.com","l":[{"oi":"x69","ot":3,"rs":1}]},{"d":"d1xlwf6km88eya.cloudfront.net","l":[{"oi":"g89","ot":3,"rs":1}]},{"d":"phenq.com","l":[{"oi":"r99","ot":3,"rs":1}]},{"d":"rejoiner.com","l":[{"oi":"t99","ot":3,"rs":1}]},{"d":"crazybulks-peabumxhjq.stackpathdns.com","l":[{"oi":"v99","ot":3,"rs":1}]},{"d":"78.46.137.168","l":[{"oi":"ba9","ot":3,"rs":1}]},{"d":"roctag.com","l":[{"oi":"mb9","ot":3,"rs":1}]},{"d":"ioimg.org","l":[{"oi":"ne9","ot":3,"rs":1}]},{"d":"nativeadmatch.com","l":[{"oi":"0f9","ot":3,"rs":1}]},{"d":"basepush.com","l":[{"oi":"8f9","ot":3,"rs":1}]},{"d":"poulpeo.com","l":[{"oi":"mh9","ot":3,"rs":1}]},{"d":"todosobrenuevayork.com","l":[{"oi":"4j9","ot":3,"rs":1}]},{"d":"puzzel.com","l":[{"oi":"sj9","ot":3,"rs":1}]},{"d":"d37p6u34ymiu6v.cloudfront.net","l":[{"oi":"7k9","ot":3,"rs":1}]},{"d":"transactionale.com","l":[{"oi":"yk9","ot":3,"rs":1}]},{"d":"adportalcloud.com","l":[{"oi":"1o9","ot":3,"rs":1}]},{"d":"tramonserver23.com","l":[{"oi":"po9","ot":3,"rs":1}]},{"d":"toolguyd.com","l":[{"oi":"hx9","ot":3,"rs":1}]},{"d":"reach5.net","l":[{"oi":"sx9","ot":3,"rs":1}]},{"d":"apsislead.com","l":[{"oi":"w0a","ot":3,"rs":1}]},{"d":"colextidapp.com","l":[{"oi":"d1a","ot":3,"rs":1}]},{"d":"dmdi.pl","l":[{"oi":"a3a","ot":3,"rs":1}]},{"d":"appuniverse.online","l":[{"oi":"y3a","ot":3,"rs":1}]},{"d":"videowalldirect.com","l":[{"oi":"o4a","ot":3,"rs":1}]},{"d":"adsmediabox.com","l":[{"oi":"w5a","ot":3,"rs":1}]},{"d":"firsthitpixel.com","l":[{"oi":"x5a","ot":3,"rs":1}]},{"d":"maxelektro.pl","l":[{"oi":"07a","ot":3,"rs":1}]},{"d":"mobilevikings.be","l":[{"oi":"17a","ot":3,"rs":1}]},{"d":"serverreply.com","l":[{"oi":"b7a","ot":3,"rs":1}]},{"d":"octupussharkattack.site","l":[{"oi":"w9a","ot":3,"rs":1}]},{"d":"customer-alliance.com","l":[{"oi":"daa","ot":3,"rs":1}]},{"d":"provesrc.com","l":[{"oi":"laa","ot":3,"rs":1}]},{"d":"inbenta.io","l":[{"oi":"6ba","ot":3,"rs":1}]},{"d":"printbar.ru","l":[{"oi":"gba","ot":3,"rs":1}]},{"d":"sgadserver.com","l":[{"oi":"nba","ot":3,"rs":1}]},{"d":"invitereferrals.com","l":[{"oi":"pba","ot":3,"rs":1}]},{"d":"dokteronline.com","l":[{"oi":"tba","ot":3,"rs":1}]},{"d":"customerly.io","l":[{"oi":"9ca","ot":3,"rs":1}]},{"d":"voipnewswire.net","l":[{"oi":"gea","ot":3,"rs":1}]},{"d":"cdn-sitegainer.com","l":[{"oi":"nha","ot":3,"rs":1}]},{"d":"tharbadir.com","l":[{"oi":"bia","ot":3,"rs":1}]},{"d":"zoomadrld.com","l":[{"oi":"qia","ot":3,"rs":1}]},{"d":"digitaliumm.com","l":[{"oi":"5ka","ot":3,"rs":1}]},{"d":"ddmanager.ru","l":[{"oi":"bka","ot":3,"rs":1}]},{"d":"worksrc.cool","l":[{"oi":"tka","ot":3,"rs":1}]},{"d":"singtraff.cool","l":[{"oi":"wka","ot":3,"rs":1}]},{"d":"higedev.cool","l":[{"oi":"zka","ot":3,"rs":1}]},{"d":"statsrc.cool","l":[{"oi":"1la","ot":3,"rs":1}]},{"d":"sendcloud.sc","l":[{"oi":"8la","ot":3,"rs":1}]},{"d":"pagescr.cool","l":[{"oi":"hla","ot":3,"rs":1}]},{"d":"pmsrv.co","l":[{"oi":"kla","ot":3,"rs":1}]},{"d":"experitalket.com","l":[{"oi":"ama","ot":3,"rs":1}]},{"d":"108.59.4.79","l":[{"oi":"3oa","ot":3,"rs":1}]},{"d":"srvaiv.com","l":[{"oi":"2qa","ot":3,"rs":1}]},{"d":"onwardinated.com","l":[{"oi":"9qa","ot":3,"rs":1}]},{"d":"infogram.com","l":[{"oi":"qqa","ot":3,"rs":1}]},{"d":"d19tiqumqauva7.cloudfront.net","l":[{"oi":"hra","ot":3,"rs":1}]},{"d":"cpm-ad.com","l":[{"oi":"esa","ot":3,"rs":1}]},{"d":"rdtrck2.com","l":[{"oi":"iva","ot":3,"rs":1}]},{"d":"mntzm.com","l":[{"oi":"6wa","ot":3,"rs":1}]},{"d":"adapti.me","l":[{"oi":"xwa","ot":3,"rs":1}]},{"d":"downtrend.com","l":[{"oi":"4xa","ot":3,"rs":1}]},{"d":"cannotmiss.it","l":[{"oi":"sxa","ot":3,"rs":1}]},{"d":"ads3-adnow.com","l":[{"oi":"zya","ot":3,"rs":1}]},{"d":"ads1-adnow.com","l":[{"oi":"0za","ot":3,"rs":1}]},{"d":"epeex.com","l":[{"oi":"60b","ot":3,"rs":1}]},{"d":"dragonball-multiverse.com","l":[{"oi":"l0b","ot":3,"rs":1}]},{"d":"ilovemyfreedom.org","l":[{"oi":"w0b","ot":3,"rs":1}]},{"d":"engine.bannersolution.net","l":[{"oi":"71b","ot":3,"rs":1}]},{"d":"openrtb.in","l":[{"oi":"h2b","ot":3,"rs":1}]},{"d":"svkrg.com","l":[{"oi":"w2b","ot":3,"rs":1}]},{"d":"iyfsearch.com","l":[{"oi":"83b","ot":3,"rs":1}]},{"d":"engageadx.com","l":[{"oi":"h4b","ot":3,"rs":1}]},{"d":"tarhanad.com","l":[{"oi":"86b","ot":3,"rs":1}]},{"d":"dailytradedesk.com","l":[{"oi":"t7b","ot":3,"rs":1}]},{"d":"shoppingink.com","l":[{"oi":"u7b","ot":3,"rs":1}]},{"d":"styletitle.com","l":[{"oi":"v7b","ot":3,"rs":1}]},{"d":"aj1807.online","l":[{"oi":"y7b","ot":3,"rs":1}]},{"d":"redirect750.us","l":[{"oi":"58b","ot":3,"rs":1}]},{"d":"adsrvx.com","l":[{"oi":"68b","ot":3,"rs":1}]},{"d":"aj1788.online","l":[{"oi":"a8b","ot":3,"rs":1}]},{"d":"bcrncdn.com","l":[{"oi":"k8b","ot":3,"rs":1}]},{"d":"ahboopublishing.advertserve.com","l":[{"oi":"l8b","ot":3,"rs":1}]},{"d":"adservingfront.com","l":[{"oi":"39b","ot":3,"rs":1}]},{"d":"adoptadx.com","l":[{"oi":"u9b","ot":3,"rs":1}]},{"d":"eyfresearch.com","l":[{"oi":"3ab","ot":3,"rs":1}]},{"d":"takeoutn.tk","l":[{"oi":"5ab","ot":3,"rs":1}]},{"d":"gotporn.com","l":[{"oi":"6ab","ot":3,"rs":1}]},{"d":"gotprofits.com","l":[{"oi":"7ab","ot":3,"rs":1}]},{"d":"trafficstars.com","l":[{"oi":"8ab","ot":3,"rs":1}]},{"d":"admidadsp.com","l":[{"oi":"hab","ot":3,"rs":1}]},{"d":"joulesnetwork.com","l":[{"oi":"ccb","ot":3,"rs":1}]},{"d":"houseofpubs.com","l":[{"oi":"dcb","ot":3,"rs":1}]},{"d":"rtbidhost.com","l":[{"oi":"jcb","ot":3,"rs":1}]},{"d":"nazreps.com","l":[{"oi":"mcb","ot":3,"rs":1}]},{"d":"traffic-media.co.uk","l":[{"oi":"ncb","ot":3,"rs":1}]},{"d":"rtbdemand.com","l":[{"oi":"pcb","ot":3,"rs":1}]},{"d":"rtbplatform.net","l":[{"oi":"scb","ot":3,"rs":1}]},{"d":"iavatarz.com","l":[{"oi":"vcb","ot":3,"rs":1}]},{"d":"prmad.com","l":[{"oi":"zcb","ot":3,"rs":1}]},{"d":"wpnjs.com","l":[{"oi":"0db","ot":3,"rs":1}]},{"d":"revlift.io","l":[{"oi":"1db","ot":3,"rs":1}]},{"d":"deceowinnul.xyz","l":[{"oi":"ddb","ot":3,"rs":1}]},{"d":"certismedia.com","l":[{"oi":"wdb","ot":3,"rs":1}]},{"d":"jforum.eu","l":[{"oi":"reb","ot":3,"rs":1}]},{"d":"cgnl.io","l":[{"oi":"seb","ot":3,"rs":1}]},{"d":"naturalbid.com","l":[{"oi":"ffb","ot":3,"rs":1}]},{"d":"myaffiliates.com","l":[{"oi":"lfb","ot":3,"rs":1}]},{"d":"supercsync.com","l":[{"oi":"1hb","ot":3,"rs":1}]},{"d":"menucool.com","l":[{"oi":"nhb","ot":3,"rs":1}]},{"d":"donewrork.org","l":[{"oi":"whb","ot":3,"rs":1}]},{"d":"d16fvbyxlcp1p1.cloudfront.net","l":[{"oi":"zhb","ot":3,"rs":1}]},{"d":"bannercompany.net","l":[{"oi":"qkb","ot":3,"rs":1}]},{"d":"free.couponxplorer.com","l":[{"oi":"ukb","ot":3,"rs":1}]},{"d":"reahash.com","l":[{"oi":"vkb","ot":3,"rs":1}]},{"d":"www.videoconverterhd.com","l":[{"oi":"hlb","ot":3,"rs":1}]},{"d":"creative.strpjmp.com","l":[{"oi":"mlb","ot":3,"rs":1}]},{"d":"go.strpjmp.com","l":[{"oi":"nlb","ot":3,"rs":1}]},{"d":"regularimptracker.xyz","l":[{"oi":"tlb","ot":3,"rs":1}]},{"d":"pay1.de","l":[{"oi":"ylb","ot":3,"rs":1}]},{"d":"netlineads.com","l":[{"oi":"unb","ot":3,"rs":1}]},{"d":"deloplen.com","l":[{"oi":"vnb","ot":3,"rs":1}]},{"d":"traffic-xchange.com","l":[{"oi":"sob","ot":3,"rs":1}]},{"d":"trk42.net","l":[{"oi":"gpb","ot":3,"rs":1}]},{"d":"trdme.com","l":[{"oi":"hpb","ot":3,"rs":1}]},{"d":"santils.com","l":[{"oi":"wpb","ot":3,"rs":1}]},{"d":"enjoycpi.com","l":[{"oi":"5qb","ot":3,"rs":1}]},{"d":"payperclickadz.com","l":[{"oi":"iqb","ot":3,"rs":1}]},{"d":"tracking22.com","l":[{"oi":"nqb","ot":3,"rs":1}]},{"d":"roiadvice.com","l":[{"oi":"oqb","ot":3,"rs":1}]},{"d":"adcannyads.com","l":[{"oi":"0rb","ot":3,"rs":1}]},{"d":"carrvun.com","l":[{"oi":"8rb","ot":3,"rs":1},{"oi":"cd4","ot":6,"rs":1}]},{"d":"adetracking.com","l":[{"oi":"arb","ot":3,"rs":1}]},{"d":"adchub.advertserve.com","l":[{"oi":"4sb","ot":3,"rs":1}]},{"d":"adaranth.com","l":[{"oi":"gsb","ot":3,"rs":1}]},{"d":"snowinn.com","l":[{"oi":"lsb","ot":3,"rs":1}]},{"d":"aceex.io","l":[{"oi":"ssb","ot":3,"rs":1}]},{"d":"adeimptrck.com","l":[{"oi":"zsb","ot":3,"rs":1}]},{"d":"bcloudhost.com","l":[{"oi":"htb","ot":3,"rs":1}]},{"d":"adsrvus.com","l":[{"oi":"vtb","ot":3,"rs":1}]},{"d":"yulder.com","l":[{"oi":"3ub","ot":3,"rs":1}]},{"d":"realtimewebanalytics.net","l":[{"oi":"bvb","ot":3,"rs":1}]},{"d":"doloncor.com","l":[{"oi":"hvb","ot":3,"rs":1}]},{"d":"amurege.com","l":[{"oi":"qvb","ot":3,"rs":1},{"oi":"bd4","ot":6,"rs":1}]},{"d":"daktela.com","l":[{"oi":"vvb","ot":3,"rs":1}]},{"d":"worldctraffic.com","l":[{"oi":"5wb","ot":3,"rs":1}]},{"d":"adsonlinesite.com","l":[{"oi":"ewb","ot":3,"rs":1}]},{"d":"griffindigitalmedia.com","l":[{"oi":"vxb","ot":3,"rs":1}]},{"d":"treadlight.mobi","l":[{"oi":"xxb","ot":3,"rs":1}]},{"d":"adokutrtb.com","l":[{"oi":"eyb","ot":3,"rs":1}]},{"d":"hotrtb.com","l":[{"oi":"lyb","ot":3,"rs":1}]},{"d":"ajio.gcdn.co","l":[{"oi":"0zb","ot":3,"rs":1}]},{"d":"neweracap.gcdn.co","l":[{"oi":"1zb","ot":3,"rs":1}]},{"d":"backtrt.com","l":[{"oi":"7zb","ot":3,"rs":1}]},{"d":"adferns.com","l":[{"oi":"hzb","ot":3,"rs":1}]},{"d":"roqoon.com","l":[{"oi":"jzb","ot":3,"rs":1}]},{"d":"germaniavid.com","l":[{"oi":"kzb","ot":3,"rs":1}]},{"d":"defk2hf18xkyy.cloudfront.net","l":[{"oi":"lzb","ot":3,"rs":1}]},{"d":"mobileappleader.com","l":[{"oi":"a3c","ot":3,"rs":1}]},{"d":"4armn.com","l":[{"oi":"p3c","ot":3,"rs":1}]},{"d":"funnydmp.com","l":[{"oi":"h4c","ot":3,"rs":1}]},{"d":"funnylbs.com","l":[{"oi":"i4c","ot":3,"rs":1}]},{"d":"bmmrtbtrack.xyz","l":[{"oi":"m4c","ot":3,"rs":1}]},{"d":"barnamajmec.com","l":[{"oi":"o4c","ot":3,"rs":1}]},{"d":"appadsnetwork.com","l":[{"oi":"b5c","ot":3,"rs":1}]},{"d":"srv4.media","l":[{"oi":"d5c","ot":3,"rs":1}]},{"d":"endpointpros.com","l":[{"oi":"h5c","ot":3,"rs":1}]},{"d":"revenuenetwork.com","l":[{"oi":"m5c","ot":3,"rs":1}]},{"d":"vidoplay.com","l":[{"oi":"p5c","ot":3,"rs":1},{"oi":"s3","ot":5,"rs":0}]},{"d":"d3fneew1ga7yhn.cloudfront.net","l":[{"oi":"66c","ot":3,"rs":1}]},{"d":"dsptr.com","l":[{"oi":"86c","ot":3,"rs":1}]},{"d":"xdztrcqwerty.xyz","l":[{"oi":"07c","ot":3,"rs":1}]},{"d":"bidmyqps.xyz","l":[{"oi":"17c","ot":3,"rs":1}]},{"d":"wxadx.xyz","l":[{"oi":"27c","ot":3,"rs":1}]},{"d":"aquaplatform.com","l":[{"oi":"08c","ot":3,"rs":1}]},{"d":"tab-technologies.com","l":[{"oi":"j9c","ot":3,"rs":1}]},{"d":"dsspz.com","l":[{"oi":"n9c","ot":3,"rs":1}]},{"d":"programalac.com","l":[{"oi":"r9c","ot":3,"rs":1}]},{"d":"d1t71p96jl9x8l.cloudfront.net","l":[{"oi":"5ac","ot":3,"rs":1}]},{"d":"zinkserv.space","l":[{"oi":"7ac","ot":3,"rs":1}]},{"d":"d1v5qq1jbl9hv7.cloudfront.net","l":[{"oi":"aac","ot":3,"rs":1}]},{"d":"webmetro.com","l":[{"oi":"hac","ot":3,"rs":1}]},{"d":"axismedia.com.hk","l":[{"oi":"iac","ot":3,"rs":1}]},{"d":"dwp0zmam7fd55.cloudfront.net","l":[{"oi":"mac","ot":3,"rs":1}]},{"d":"adsolut.in","l":[{"oi":"vac","ot":3,"rs":1}]},{"d":"bannerplay.com","l":[{"oi":"wac","ot":3,"rs":1}]},{"d":"brandscreen.com","l":[{"oi":"xac","ot":3,"rs":1}]},{"d":"rovion.com","l":[{"oi":"yac","ot":3,"rs":1}]},{"d":"filkasbul.com","l":[{"oi":"zac","ot":3,"rs":1}]},{"d":"cannedbanners.com","l":[{"oi":"0bc","ot":3,"rs":1}]},{"d":"13l14z2.com","l":[{"oi":"5bc","ot":3,"rs":1}]},{"d":"d2638j3z8ek976.cloudfront.net","l":[{"oi":"6bc","ot":3,"rs":1}]},{"d":"Display.b-cdn.net","l":[{"oi":"abc","ot":3,"rs":1}]},{"d":"tracking360.net","l":[{"oi":"bbc","ot":3,"rs":1}]},{"d":"madetracking.com","l":[{"oi":"ebc","ot":3,"rs":1}]},{"d":"utilityextensionnewtab.com","l":[{"oi":"fbc","ot":3,"rs":1}]},{"d":"aerifymedia.com","l":[{"oi":"gbc","ot":3,"rs":1}]},{"d":"d321ufp9gvkjnc.cloudfront.net","l":[{"oi":"hbc","ot":3,"rs":1}]},{"d":"agrilandusa.com","l":[{"oi":"jbc","ot":3,"rs":1}]},{"d":"thespruceeatstracking.com","l":[{"oi":"kbc","ot":3,"rs":1}]},{"d":"adsovo.com","l":[{"oi":"lbc","ot":3,"rs":1}]},{"d":"reddragonimports.net","l":[{"oi":"mbc","ot":3,"rs":1}]},{"d":"theadserver.net","l":[{"oi":"nbc","ot":3,"rs":1}]},{"d":"digitalmediayield.com","l":[{"oi":"obc","ot":3,"rs":1}]},{"d":"trustedhousesitterstracking.com","l":[{"oi":"pbc","ot":3,"rs":1}]},{"d":"mbserv.space","l":[{"oi":"qbc","ot":3,"rs":1}]},{"d":"tiesike.com","l":[{"oi":"rbc","ot":3,"rs":1}]},{"d":"adcroma.com","l":[{"oi":"sbc","ot":3,"rs":1}]},{"d":"superappmobile.com","l":[{"oi":"tbc","ot":3,"rs":1}]},{"d":"slvtrcrtb-1703.xyz","l":[{"oi":"ubc","ot":3,"rs":1}]},{"d":"moutnan.com","l":[{"oi":"wbc","ot":3,"rs":1}]},{"d":"craggog.com","l":[{"oi":"xbc","ot":3,"rs":1}]},{"d":"track3.space","l":[{"oi":"ybc","ot":3,"rs":1}]},{"d":"kyralindar.com","l":[{"oi":"zbc","ot":3,"rs":1}]},{"d":"lvodesign.com","l":[{"oi":"0cc","ot":3,"rs":1}]},{"d":"audiencesignal.com","l":[{"oi":"1cc","ot":3,"rs":1}]},{"d":"demporky.com","l":[{"oi":"2cc","ot":3,"rs":1}]},{"d":"cointuet.com","l":[{"oi":"3cc","ot":3,"rs":1}]},{"d":"schunto.com","l":[{"oi":"4cc","ot":3,"rs":1}]},{"d":"adservercheck.net","l":[{"oi":"5cc","ot":3,"rs":1}]},{"d":"adpicmedia.net","l":[{"oi":"6cc","ot":3,"rs":1}]},{"d":"fadb.xyz","l":[{"oi":"7cc","ot":3,"rs":1}]},{"d":"algovid.com","l":[{"oi":"4","ot":5,"rs":0}]},{"d":"algovid.tv","l":[{"oi":"5","ot":5,"rs":0}]},{"d":"beardfleet.com","l":[{"oi":"6","ot":5,"rs":0}]},{"d":"p.imprvdosrv.com","l":[{"oi":"7","ot":5,"rs":1}]},{"d":"memevideoad.com","l":[{"oi":"8","ot":5,"rs":0}]},{"d":"cmbestsrv.com","l":[{"oi":"a","ot":5,"rs":0}]},{"d":"contvdo.com","l":[{"oi":"e","ot":5,"rs":0}]},{"d":"vdoadtube.com","l":[{"oi":"g","ot":5,"rs":0}]},{"d":"optvdo.com","l":[{"oi":"i","ot":5,"rs":0}]},{"d":"stat-rock.com","l":[{"oi":"j","ot":5,"rs":0}]},{"d":"player.aniview.com","l":[{"oi":"k","ot":5,"rs":0}]},{"d":"selectmedia.asia","l":[{"oi":"l","ot":5,"rs":0}]},{"d":"ad.lkqd.net","l":[{"oi":"m","ot":5,"rs":0}]},{"d":"algoyld.com","l":[{"oi":"31","ot":5,"rs":0}]},{"d":"bstvidimp.com","l":[{"oi":"61","ot":5,"rs":0}]},{"d":"versvideo.com","l":[{"oi":"b1","ot":5,"rs":0}]},{"d":"p.versod.com","l":[{"oi":"m1","ot":5,"rs":0}]},{"d":"hiimps.com","l":[{"oi":"62","ot":5,"rs":0}]},{"d":"pubpges.com","l":[{"oi":"n2","ot":5,"rs":0}]},{"d":"serviiop.com","l":[{"oi":"p2","ot":5,"rs":0}]},{"d":"imprnjmp.taboola.com","l":[{"oi":"q2","ot":5,"rs":0}]},{"d":"pageonp.com","l":[{"oi":"t2","ot":5,"rs":0}]},{"d":"directonit.com","l":[{"oi":"v2","ot":5,"rs":0}]},{"d":"yldvid.com","l":[{"oi":"w2","ot":5,"rs":0}]},{"d":"publivep.com","l":[{"oi":"x2","ot":5,"rs":0}]},{"d":"cedatoplayer.com","l":[{"oi":"y2","ot":5,"rs":0}]},{"d":"plyrgs.com","l":[{"oi":"03","ot":5,"rs":0}]},{"d":"mdmdgrs.com","l":[{"oi":"23","ot":5,"rs":0}]},{"d":"goimpi.com","l":[{"oi":"33","ot":5,"rs":0}]},{"d":"mrmdgrp.com","l":[{"oi":"43","ot":5,"rs":0}]},{"d":"zdvid.com","l":[{"oi":"53","ot":5,"rs":0}]},{"d":"mamw360.com","l":[{"oi":"63","ot":5,"rs":0}]},{"d":"upiew.com","l":[{"oi":"73","ot":5,"rs":0}]},{"d":"onextii.com","l":[{"oi":"83","ot":5,"rs":0}]},{"d":"smrpm.com","l":[{"oi":"93","ot":5,"rs":0}]},{"d":"gwmprogrammatic.com","l":[{"oi":"b3","ot":5,"rs":0}]},{"d":"shulply.com","l":[{"oi":"d3","ot":5,"rs":0}]},{"d":"bchbrands.com","l":[{"oi":"e3","ot":5,"rs":0}]},{"d":"nextitgo.com","l":[{"oi":"f3","ot":5,"rs":0}]},{"d":"keymediads.com","l":[{"oi":"h3","ot":5,"rs":0}]},{"d":"valoalgo.com","l":[{"oi":"i3","ot":5,"rs":0}]},{"d":"stream4play.com","l":[{"oi":"k3","ot":5,"rs":0}]},{"d":"a.vdo.ai","l":[{"oi":"l3","ot":5,"rs":0}]},{"d":"clicksbuzz.com","l":[{"oi":"n3","ot":5,"rs":0}]},{"d":"vexigo.video","l":[{"oi":"t3","ot":5,"rs":0}]},{"d":"scrllit.com","l":[{"oi":"u3","ot":5,"rs":0}]},{"d":"avantisvideo.com","l":[{"oi":"v3","ot":5,"rs":0}]},{"d":"shulcont.com","l":[{"oi":"w3","ot":5,"rs":0}]},{"d":"durectionse.com","l":[{"oi":"x3","ot":5,"rs":0}]},{"d":"ws.com/jscache/","l":[{"oi":"et2","ot":6,"rs":1}]},{"d":"htzz='decenter","l":[{"oi":"sz2","ot":6,"rs":1}]},{"d":"/2a679/intel_","l":[{"oi":"9s3","ot":6,"rs":1}]},{"d":"pli=29182863","l":[{"oi":"wb4","ot":6,"rs":1}]},{"d":"pli=29182860","l":[{"oi":"xb4","ot":6,"rs":1}]},{"d":"a.si=6482&a.t","l":[{"oi":"7c4","ot":6,"rs":1}]},{"d":"eb/3/2b631/sabic","l":[{"oi":"ed4","ot":6,"rs":1}]},{"d":"eb/3/2b65b/cred","l":[{"oi":"hd4","ot":6,"rs":1}]},{"d":"sid=4502812&kid","l":[{"oi":"2f4","ot":6,"rs":1}]},{"d":"sid=4502811&kid","l":[{"oi":"8f4","ot":6,"rs":1}]},{"d":"sid=4502670&kid","l":[{"oi":"9f4","ot":6,"rs":1}]},{"d":"sid=4502671&kid","l":[{"oi":"rf4","ot":6,"rs":1}]},{"d":"campaignId=139350&","l":[{"oi":"uf4","ot":6,"rs":1}]},{"d":"campaignId=139351&","l":[{"oi":"vf4","ot":6,"rs":1}]},{"d":"sid=4502813&kid","l":[{"oi":"wf4","ot":6,"rs":1}]},{"d":"sid=4502814&kid","l":[{"oi":"xf4","ot":6,"rs":1}]},{"d":"crid=p1lzvq3x","l":[{"oi":"kg4","ot":6,"rs":1}]},{"d":"crid=9nw6h61u","l":[{"oi":"lg4","ot":6,"rs":1}]},{"d":"crid=5ujf3glf","l":[{"oi":"mg4","ot":6,"rs":1}]},{"d":"d38g8ai8tpq877","l":[{"oi":"og4","ot":6,"rs":1}]},{"d":"\"\\x67\\x30\",\"\\x35\\x2F\",\"\\x34\"","l":[{"oi":"7i4","ot":6,"rs":1}]},{"d":"N1116285.275231PALLACANESTROVARE","l":[{"oi":"9j4","ot":6,"rs":1}]},{"d":"N1149640.3330988ADRIANRADBM","l":[{"oi":"cj4","ot":6,"rs":1}]},{"d":"nwid=3496&","l":[{"oi":"oj4","ot":6,"rs":1}]},{"d":"pli=27665881","l":[{"oi":"0k4","ot":6,"rs":1}]},{"d":"pli=1075157216","l":[{"oi":"jl4","ot":6,"rs":1}]},{"d":"rp-aqid=\\\"4174:","l":[{"oi":"1m4","ot":6,"rs":1}]},{"d":"bn=34829336","l":[{"oi":"6m4","ot":6,"rs":1}]},{"d":"bn=34822110","l":[{"oi":"8m4","ot":6,"rs":1}]},{"d":"bn=34830053","l":[{"oi":"cm4","ot":6,"rs":1}]},{"d":"a.si=7475&a.t","l":[{"oi":"ym4","ot":6,"rs":1}]},{"d":"279_nginad_","l":[{"oi":"dn4","ot":6,"rs":1}]},{"d":"m.bannerplay.com/","l":[{"oi":"1r4","ot":6,"rs":1}]},{"d":"c','dn.','dsp','tr.'","l":[{"oi":"ur4","ot":6,"rs":1}]},{"d":"cdn.dsp');document","l":[{"oi":"vr4","ot":6,"rs":1}]},{"d":"tid=5d36483eba2e540a943f6cfe","l":[{"oi":"gs4","ot":6,"rs":1}]},{"d":"a.si=7636&a.t","l":[{"oi":"6t4","ot":6,"rs":1}]},{"d":"N1116282.3575860PLACEMENT_SITE-M","l":[{"oi":"fu4","ot":6,"rs":1}]},{"d":"bn=34502641","l":[{"oi":"gu4","ot":6,"rs":1}]},{"d":"bn=35970978","l":[{"oi":"zu4","ot":6,"rs":1}]},{"d":"aid=48507252&","l":[{"oi":"ov4","ot":6,"rs":1}]},{"d":"aid=48507247&","l":[{"oi":"qv4","ot":6,"rs":1}]},{"d":"aid=48525540&","l":[{"oi":"yv4","ot":6,"rs":1}]},{"d":"nnerplay.com/afr","l":[{"oi":"hw4","ot":6,"rs":1}]},{"d":"paign_id=330391","l":[{"oi":"mw4","ot":6,"rs":1}]},{"d":"write('sptr.co');","l":[{"oi":"ow4","ot":6,"rs":1}]},{"d":"y Member 11000 via A","l":[{"oi":"pw4","ot":6,"rs":1}]},{"d":".cloudfront.net/user.profile.js\"","l":[{"oi":"uw4","ot":6,"rs":1}]},{"d":"N1207130.3330988ADRIANRADBM","l":[{"oi":"vw4","ot":6,"rs":1}]},{"d":"N1254601.3330988ADRIANRADBM","l":[{"oi":"1x4","ot":6,"rs":1}]},{"d":"/cr/799322/s/","l":[{"oi":"9x4","ot":6,"rs":1}]},{"d":"cr-9et-4kyclbt_tlv4","l":[{"oi":"ix4","ot":6,"rs":1}]},{"d":"287_patgo125wua","l":[{"oi":"px4","ot":6,"rs":1}]},{"d":"oudfront.net/path/to/autotrack.custom.js","l":[{"oi":"sx4","ot":6,"rs":1}]},{"d":"/s/163404?ex","l":[{"oi":"ux4","ot":6,"rs":1}]},{"d":"NzOi8vcHJlcGlyZC5","l":[{"oi":"vx4","ot":6,"rs":1}]},{"d":"aid=48637144&","l":[{"oi":"4y4","ot":6,"rs":1}]},{"d":"aid=48637837&","l":[{"oi":"hy4","ot":6,"rs":1}]},{"d":"aid=48637995&","l":[{"oi":"oy4","ot":6,"rs":1}]},{"d":"6747740e25d1de257cff4119230e7baeb525682b","l":[{"oi":"gz4","ot":6,"rs":1}]},{"d":"pli=29659098","l":[{"oi":"lz4","ot":6,"rs":1}]},{"d":"pli=29659527","l":[{"oi":"mz4","ot":6,"rs":1}]},{"d":"pli=29660584","l":[{"oi":"nz4","ot":6,"rs":1}]},{"d":"pli=29660585","l":[{"oi":"oz4","ot":6,"rs":1}]},{"d":"pli=29659445","l":[{"oi":"pz4","ot":6,"rs":1}]},{"d":"pli=29659485","l":[{"oi":"qz4","ot":6,"rs":1}]},{"d":"CICAgKDnstmEXxABGAEoATIIdkmJKT1hqcdAy5XI8wU","l":[{"oi":"rz4","ot":6,"rs":1}]},{"d":"0RUaeBJRfh_895903838","l":[{"oi":"sz4","ot":6,"rs":1}]},{"d":"0RRps1GT0J_594065955","l":[{"oi":"tz4","ot":6,"rs":1}]},{"d":"0R4YAqC4WX_404573013","l":[{"oi":"uz4","ot":6,"rs":1}]},{"d":"0RN6ypNlY1_1950980938","l":[{"oi":"vz4","ot":6,"rs":1}]},{"d":"0RJaYGgQmi_1063588838","l":[{"oi":"wz4","ot":6,"rs":1}]},{"d":"0RfcYzpir8_1286827835","l":[{"oi":"xz4","ot":6,"rs":1}]},{"d":"0R7Y6bwdZk_274779564","l":[{"oi":"yz4","ot":6,"rs":1}]},{"d":"0Rctgdl3Eo_769758463","l":[{"oi":"zz4","ot":6,"rs":1}]},{"d":"0RlAJY9hlf_351956517","l":[{"oi":"005","ot":6,"rs":1}]},{"d":"\"#f\",\"f\",\"p\",\"x\",\"2\",\"0x\",\"0\",","l":[{"oi":"105","ot":6,"rs":1}]},{"d":".cloudfront.net/analytics.js/v1/\" + t","l":[{"oi":"205","ot":6,"rs":1}]},{"d":"CICAgKDn8tmoXRABGAEoATIIgzbZL96CziRAz9zN8wU","l":[{"oi":"305","ot":6,"rs":1}]},{"d":"cr-pkghsnqh-cvrf10","l":[{"oi":"405","ot":6,"rs":1}]},{"d":"N1254150.3330988ADRIANRADBM","l":[{"oi":"505","ot":6,"rs":1}]},{"d":"\"o\",\"nt\",\"ou\",\"c\",\"hs\",\"t","l":[{"oi":"605","ot":6,"rs":1}]},{"d":"CICAgKDniuGgRBABGAEoATIIVPLAYGeKnBNA3_TS8wU","l":[{"oi":"705","ot":6,"rs":1}]},{"d":"0RoTWcfwae_1750281518","l":[{"oi":"805","ot":6,"rs":1}]},{"d":"/4703943/0/","l":[{"oi":"905","ot":6,"rs":1}]},{"d":"94771078dc04c7cc03061756768ad1a292fbc4b6","l":[{"oi":"a05","ot":6,"rs":1}]},{"d":"buserts\"+\"hus.\"+\"c\"","l":[{"oi":"b05","ot":6,"rs":1}]},{"d":"CICAgKDnmtHFKxCsAhj6ASgBMghXV9RG8OKwHA","l":[{"oi":"c05","ot":6,"rs":1}]},{"d":"paign_id=200087749","l":[{"oi":"d05","ot":6,"rs":1}]},{"d":"servingisserving.com","l":[{"oi":"e05","ot":6,"rs":1}]},{"d":"paign_id=200087775","l":[{"oi":"f05","ot":6,"rs":1}]},{"d":"a.si=7574&a.t","l":[{"oi":"g05","ot":6,"rs":1}]},{"d":"CICAgKDn2tzEWxABGAEoATIIe2LPLu1GmQ1Ajtnx8wU","l":[{"oi":"h05","ot":6,"rs":1}]},{"d":"CICAgKDn2szmSRABGAEoATII9qfr1Zdk00VA_cPx8wU","l":[{"oi":"i05","ot":6,"rs":1}]},{"d":"paign_id=200087783","l":[{"oi":"j05","ot":6,"rs":1}]},{"d":"adId=4559505;","l":[{"oi":"k05","ot":6,"rs":1}]},{"d":"pli=1075354306","l":[{"oi":"l05","ot":6,"rs":1}]},{"d":"ai=4559505&","l":[{"oi":"m05","ot":6,"rs":1}]},{"d":"ai=4558957&","l":[{"oi":"n05","ot":6,"rs":1}]},{"d":"pli=1075352050","l":[{"oi":"o05","ot":6,"rs":1}]},{"d":"adId=4558957;","l":[{"oi":"p05","ot":6,"rs":1}]},{"d":"paign_id=200088137","l":[{"oi":"q05","ot":6,"rs":1}]},{"d":".cloudfront.net/path/to/emergence.min.js","l":[{"oi":"r05","ot":6,"rs":1}]},{"d":"N798773.3330988ADRIANRADBM","l":[{"oi":"s05","ot":6,"rs":1}]},{"d":"paign_id=200088468","l":[{"oi":"v05","ot":6,"rs":1}]},{"d":"paign_id=200088471","l":[{"oi":"w05","ot":6,"rs":1}]},{"d":"paign_id=200088147","l":[{"oi":"x05","ot":6,"rs":1}]},{"d":"paign_id=200087500","l":[{"oi":"y05","ot":6,"rs":1}]},{"d":"paign_id=200088751","l":[{"oi":"015","ot":6,"rs":1}]},{"d":"paign_id=200088942","l":[{"oi":"115","ot":6,"rs":1}]},{"d":"pli=1075397059","l":[{"oi":"215","ot":6,"rs":1}]},{"d":"pli=1075395367","l":[{"oi":"315","ot":6,"rs":1},{"oi":"915","ot":6,"rs":1}]},{"d":"pli=1075397054","l":[{"oi":"415","ot":6,"rs":1}]},{"d":"pli=1075397060","l":[{"oi":"515","ot":6,"rs":1}]},{"d":"paign_id=200088467","l":[{"oi":"815","ot":6,"rs":1}]},{"d":"pli=1075395370","l":[{"oi":"a15","ot":6,"rs":1}]},{"d":"pli=1075395732","l":[{"oi":"b15","ot":6,"rs":1}]},{"d":"pli=1075395369","l":[{"oi":"c15","ot":6,"rs":1}]},{"d":"pli=1075397058","l":[{"oi":"d15","ot":6,"rs":1}]},{"d":"pli=1075392899","l":[{"oi":"e15","ot":6,"rs":1}]},{"d":"pli=1075395371","l":[{"oi":"f15","ot":6,"rs":1}]},{"d":"paign_id=200088469","l":[{"oi":"g15","ot":6,"rs":1}]},{"d":"paign_id=200088470","l":[{"oi":"h15","ot":6,"rs":1}]},{"d":"CICAgKDnhoL5rwEQARgBKAEyCPOn_arAh61aQO3Ih_QF","l":[{"oi":"j15","ot":6,"rs":1}]},{"d":"paign_id=200089177","l":[{"oi":"m15","ot":6,"rs":1}]},{"d":"pli=1075395368","l":[{"oi":"n15","ot":6,"rs":1}]},{"d":"paign_id=200088965","l":[{"oi":"o15","ot":6,"rs":1}]},{"d":"paign_id=200089190","l":[{"oi":"q15","ot":6,"rs":1}]},{"d":"paign_id=200089189","l":[{"oi":"r15","ot":6,"rs":1}]},{"d":"rtb.adx1.com","l":[{"oi":"1","ot":7,"rs":1}]},{"d":"bidsopt.com","l":[{"oi":"5","ot":7,"rs":1}]},{"d":"cdn.dsptr.com","l":[{"oi":"a","ot":7,"rs":1}]},{"d":"envisionx.co","l":[{"oi":"b","ot":7,"rs":1}]},{"d":"ecads2.mediasmart.io","l":[{"oi":"e","ot":7,"rs":1}]},{"d":"ads.mediasmart.es","l":[{"oi":"f","ot":7,"rs":1}]},{"d":"notify.nuviad.com","l":[{"oi":"g","ot":7,"rs":1}]},{"d":"vashoot.com","l":[{"oi":"m","ot":7,"rs":1}]},{"d":"digitaladsystems.com","l":[{"oi":"z","ot":7,"rs":1}]},{"d":"ato.mx","l":[{"oi":"11","ot":7,"rs":1}]},{"d":"adp3.net","l":[{"oi":"31","ot":7,"rs":1}]},{"d":"servedbyadbutler.com","l":[{"oi":"c1","ot":7,"rs":1}]},{"d":"decenterads.com","l":[{"oi":"e1","ot":7,"rs":1}]},{"d":"wapstart.ru","l":[{"oi":"f1","ot":7,"rs":1}]},{"d":"niutux.com","l":[{"oi":"h1","ot":7,"rs":1}]},{"d":"bkserving.com","l":[{"oi":"o1","ot":7,"rs":1}]},{"d":"bucksense.io","l":[{"oi":"p1","ot":7,"rs":1}]},{"d":"adglobal.tech","l":[{"oi":"s1","ot":7,"rs":1}]},{"d":"media-servers.net","l":[{"oi":"t1","ot":7,"rs":1}]},{"d":"trading-rtbg.com","l":[{"oi":"u1","ot":7,"rs":1}]},{"d":"rtbsbengine.com","l":[{"oi":"v1","ot":7,"rs":1}]},{"d":"pixel.valo.ai","l":[{"oi":"w1","ot":7,"rs":1}]},{"d":"uuidksinc.net","l":[{"oi":"x1","ot":7,"rs":1}]},{"d":"rtb.reklamdsp.com","l":[{"oi":"y1","ot":7,"rs":1}]},{"d":"webtradingspot.com","l":[{"oi":"z1","ot":7,"rs":1}]},{"d":"rtbtradein.com","l":[{"oi":"02","ot":7,"rs":1}]},{"d":"bo-rtb.com","l":[{"oi":"22","ot":7,"rs":1}]},{"d":"pixel.metanetwork.mobi","l":[{"oi":"32","ot":7,"rs":1}]},{"d":"mobuppsrtb.com","l":[{"oi":"42","ot":7,"rs":1}]},{"d":"motionspots.com","l":[{"oi":"52","ot":7,"rs":1}]},{"d":"rtb.nativeads.com","l":[{"oi":"72","ot":7,"rs":1}]},{"d":"servedby.revive-adserver.net","l":[{"oi":"82","ot":7,"rs":1}]},{"d":"brightmountainads.com","l":[{"oi":"92","ot":7,"rs":1}]},{"d":"life-insurance1.co.uk","l":[{"oi":"y4x7","ot":4,"rs":1}]}],"h":"document","f":"write"}]},
    activation: '|||MjE5NzUwMDg3,|||MjQxMTU4MzI3,|||MjE4NTM0MTI3,|||MzcxMTIwNzI3,|||MjQ1ODAxODQ0OQ==,|||MzUwMDYwNzI3,|||MzUwNjE1ODQ3,|co|ex|MQ==,|||MjQxMTU4MzI3,|||MA==',
    prebidExcludeBidders: confiantGlobal.prebidExcludeBidders || [], //prebid bidder exclusion list
    sandbox: confiantGlobal.sandbox || '0',
    prebidNameSpace: confiantGlobal.prebidNameSpace || 'pbjs',
    callback: confiantGlobal.callback || defaultCallback,
    isMaster: typeof confiantGlobal.isMaster == 'boolean' ? confiantGlobal.isMaster : true,
    devMode: confiantGlobal.devMode,
    enable_integrations: confiantGlobal.enable_integrations || 'prebid:true,gpt:true',
    isSA: 'true' === 'true',
    isCDT: 'true' === 'true',
    isPerf: 'undefined' === 'true',
    isAR: confiantGlobal.isAR || 'false' === 'true',
    isHT: confiantGlobal.isHT || 'undefined' === 'true',
    arC: parseInt('3'),
    isIntegrationEnabled: isIntegrationEnabled,
  };
  var scriptId = !!confiantGlobal.settings ? settings.propertyId : null;
  var propertySettings = scriptId ? confiantGlobal[scriptId] || (confiantGlobal[scriptId] = {}) : confiantGlobal;
  propertySettings.settings = settings;
  propertySettings.settings['gpt_and_prebid'] = integrationSetting;
  function injectScript(path) {
    var e = document.createElement('script');
    if (scriptId) {
      e.id = scriptId;
    }
    e.async = true;
    e.src = path;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(e, s);
  }
  var shouldAddAllIntegerations = propertySettings.settings.propertyId === 'test_account';

  function isIntegrationEnabled(type) {
    var integrations = propertySettings.settings.enable_integrations;
    var checkType = Array.isArray(integrations) ? type : type + ':true';
    return shouldAddAllIntegerations || (integrations && integrations.indexOf(checkType) > -1);
  }
  if (isIntegrationEnabled('gpt')) {
    injectScript('//' + [propertySettings.settings.confiantCdn, 'gpt', (integrationSetting.exec_test_ver ? integrationSetting.exec_test_ver : integrationSetting.gpt_integration_version), 'wrap.js'].join('/'));
  }
  if (isIntegrationEnabled('prebid')) {
    injectScript('//' + [propertySettings.settings.confiantCdn, 'prebid', (integrationSetting.exec_test_ver ? integrationSetting.exec_test_ver : integrationSetting.prebid_integration_version), 'wrap.js'].join('/'));
  }

  var isCmpSupported = false;
  if (settings.devMode === 0 || settings.devMode === 2 || (isCmpSupported && Math.random() <= 0.1)) {
    injectScript('//' + [propertySettings.settings.confiantCdn, 'c', integrationSetting.c_integration_version, 'wrap.js'].join('/'));
  }

  if (!isIntegrationEnabled('gpt') && !isIntegrationEnabled('prebid')) {
    console.warn('Confiant', 'Current configuration is set not to monitor, please contact support@confiant.com');
  }
})();
