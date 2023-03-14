const VERSION = "1095492";

const BING_TRANSLATE_URL =
  "https://cn.bing.com/ttranslatev3?IG=-1&IID=translator.5028";

const BING_LOOKUP_URL =
  "https://cn.bing.com/tlookupv3?IG=-1&IID=translator.5024.5";

const BING_AUDIO_URL =
  "https://cn.bing.com/tfettts?&IG=-1&IID=translator.5024.3";

const HEADERS = {
  "content-type": "application/x-www-form-urlencoded",
  cookie:
    "_EDGE_V=1; MUID=25B302F65DD76FED07C010FF5C946EB8; MUIDB=25B302F65DD76FED07C010FF5C946EB8; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=045860AFE62B4D6BAB105B0001325AE2&dmnchg=1; MMCASM=ID=DD4D2316884D4D628AC120FDBB61029A; _clck=5kferu|1|f50|0; HPHOL=0; MicrosoftApplicationsTelemetryDeviceId=b044d1d8-538f-4db3-89a7-208dc82e79ca; JV=A3ODxmMAANyMMiFNB6MM1Kku55H_-Z4uFDwbRWFHSoyljC3vRTIcg9nsdDxOCFN1wK1lDw-5DqsjVKNBaoYmdZ-5XpoUbJ0CR_Z3WGkaS6-IlNa9bu82FpMsDTfbEGYgRGLc1BHoYOeZf9fBWdc7AkdAScS4lPYURCg-th3diBjB7_VdO5czKnALMLZ6Tid0hhF2Ud6bKHGsbxBXS4QkGumgKOBeBZXwHYyzH_XDcZxUENwArPAF0hThaMQRrc3--9_Z_eCmftXm7jXX1MWpoco6TaTVc1E29p5XnYnBPlXn8aHUcQLIOmZoQU_Myj1ouViKlTz9HJZAtLnLyACieU9n2-zrSTrEYrjh38QHSKH1JgJRPGWGi-gQTL8v-tDdUg-z17ZDqlcb-wzmyizlHmesjBMlTDPqWVxRwrmmU6A34vrcmfU-s4hs3VWMDWuzyfoAN9Z87o5guxEpj3QijtvDDDzIuuaSC6bWZNMvzNI&v=2; imgv=flts=20220926&lodlg=1; TRBDG=FIMPR=1; _UR=QS=0&TQS=0&OMD=13319534264&cdxndoff=1; ZHLASTACTIVECHAT=0; ANIMIA=FRE=1; ZHCHATSTRONGATTRACT=TRUE; btstkn=NMSOsK3KLDQwfP6u%252FPbeHO7xPX6zqDnkL6yPjzhQhEq%252BtizzN1aOkw2l7m3336TxAk5oqfYqnRBq4qndHsRzBkfac7Gg7n6J6Vn%252F5YDQmWM%253D; HOOKBLOCKINDICATOR=TRUE; SUID=M; ZHCHATWEAKATTRACT=TRUE; ABDEF=V=13&ABDV=11&MRNB=1677985604380&MRB=0; _EDGE_S=SID=06DBA51E90AE6CAD37F5B7D5917C6DA6; _SS=SID=06DBA51E90AE6CAD37F5B7D5917C6DA6&R=200&RB=0&GB=0&RG=200&RP=200&PC=U316; SRCHS=PC=U316; ipv6=hit=1677999522551&t=4; _HPVN=CS=eyJQbiI6eyJDbiI6OTYsIlN0IjoyLCJRcyI6MCwiUHJvZCI6IlAifSwiU2MiOnsiQ24iOjk2LCJTdCI6MCwiUXMiOjAsIlByb2QiOiJIIn0sIlF6Ijp7IkNuIjo5NiwiU3QiOjEsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyMy0wMy0wNVQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIkRmdCI6bnVsbCwiTXZzIjowLCJGbHQiOjAsIkltcCI6NDAxNX0=; ai_session=EPdCgmkOhhgq3rLQLLk1rs|1677993829464|1677997814294; SRCHUSR=DOB=20221126&T=1677997811000&TPC=1677995287000; SNRHOP=I=&TS=; _RwBf=ilt=3431&ihpd=4&ispd=76&rc=200&rb=0&gb=0&rg=200&pc=200&mtu=0&rbb=0&g=0&cid=&clo=0&v=135&l=2023-03-04T08:00:00.0000000Z&lft=2023-02-07T00:00:00.0000000-08:00&aof=0&o=2&p=&c=&t=0&s=0001-01-01T00:00:00.0000000+00:00&ts=2023-03-05T06:30:23.2035350+00:00&rwred=0&wls=&lka=0&lkt=0&TH=; _tarLang=default=zh-Hans; _TTSS_IN=hist=WyJydSIsImRlIiwiZW4iLCJhdXRvLWRldGVjdCJd; _TTSS_OUT=hist=WyJ6aC1IYW50IiwiZW4iLCJ6aC1IYW5zIl0=; SRCHHPGUSR=SRCHLANG=zh-Hans&BRW=M&BRH=S&CW=1280&CH=667&SCW=1263&SCH=2829&DPR=2.0&UTC=480&DM=0&PV=10.0.0&WTS=63813594611&BZA=0&PRVCW=1280&PRVCH=667&HV=1677998216",
};

const AUDIO = {
  "zh-Hans": (text) =>
    `<speak version='1.0' xml:lang='zh-CN'><voice xml:lang='zh-CN' xml:gender='Female' name='zh-CN-XiaoxiaoNeural'><prosody rate='-20.00%'>${text}</prosody></voice></speak>`,
  "zh-Hant": (text) =>
    `<speak version='1.0' xml:lang='zh-CN'><voice xml:lang='zh-CN' xml:gender='Female' name='zh-CN-XiaoxiaoNeural'><prosody rate='-20.00%'>${text}</prosody></voice></speak>`,
  en: (text) =>
    `<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='en-US-AriaNeural'><prosody rate='-20.00%'>${text}</prosody></voice></speak>`,
  ja: (text) =>
    `<speak version='1.0' xml:lang='ja-JP'><voice xml:lang='ja-JP' xml:gender='Female' name='ja-JP-NanamiNeural'><prosody rate='-20.00%'>${text}</prosody></voice></speak>`,
  ko: (text) =>
    `<speak version='1.0' xml:lang='ko-KR'><voice xml:lang='ko-KR' xml:gender='Female' name='ko-KR-SunHiNeural'><prosody rate='-20.00%'>${text}</prosody></voice></speak>`,
  fr: (text) =>
    `<speak version='1.0' xml:lang='fr-FR'><voice xml:lang='fr-FR' xml:gender='Female' name='fr-FR-DeniseNeural'><prosody rate='-20.00%'>${text}</prosody></voice></speak>`,
  ru: (text) =>
    `<speak version='1.0' xml:lang='ru-RU'><voice xml:lang='ru-RU' xml:gender='Female' name='ru-RU-DariyaNeural'><prosody rate='-20.00%'>${text}</prosody></voice></speak>`,
  de: (text) =>
    `<speak version='1.0' xml:lang='de-DE'><voice xml:lang='de-DE' xml:gender='Female' name='de-DE-KatjaNeural'><prosody rate='-20.00%'>${text}</prosody></voice></speak>`,
};

module.exports = {
  AUDIO,
  VERSION,
  HEADERS,
  BING_LOOKUP_URL,
  BING_AUDIO_URL,
  BING_TRANSLATE_URL,
};
