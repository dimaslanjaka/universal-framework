<?php
global $spp_settings;
$spp_settings = new stdClass;

// You can have more than one rewrite rule now
$spp_settings->url_rewrites = array( 
    'tag' => array('separator' => '-', 'rule' => 'tag/(.*)', 'index' => 1, 'permalink' => 'tag/{{ term }}' ), //0
    'random' => array('separator' => '-', 'rule' => '(.*)/(.*)\.html', 'index' => 2, 'permalink' => '{{ random }}/{{ term }}.html' ), //1
    'first_word' => array('separator' => '-', 'rule' => '(.*)/(.*)\.html', 'index' => 2, 'permalink' => '{{ first_word }}/{{ term }}.html' ), //2
    
    'index_image' => array('separator' => '-', 'rule' => 'tag/(.*)', 'index' => 1, 'permalink' => 'tag/{{ term }}' ),
    'single_image' => array('separator' => '-', 'rule' => 'images/(.*)', 'index' => 1, 'permalink' => 'images/{{ term }}' ), //3    
    
    
    'index_video' => array('separator' => '-', 'rule' => 'tag/(.*)', 'index' => 1, 'permalink' => 'tag/{{ term }}' ), //5
    'single_video' => array('separator' => '-', 'rule' => 'videos/(.*)', 'index' => 1, 'permalink' => 'videos/{{ term }}' ),

    // separator, rewrite, preg_index
	);

// Default filters before displayed
$spp_settings->default_filters = array(
    'remove' => array('Instantly connect to whats most important to you.', '...', '..'),
    );

// if set to true, StupidPie will only store search terms if visitor is coming from specific country i.e: array('US','UK','DE')
$spp_settings->country_targeting = array();

// filter bad domains here
$spp_settings->bad_urls = array('youporn.com', 'facebook.com');

// this words will be automatically removed, and if the title contains these words, it will return 404 not found
$spp_settings->bad_words = 'yahoo! groups,ensiklopedia bebas,tokobagus.com,3some,4some,amcik,anal,analingus,analplay,anal-play,androsodomy,andskota,anilingus,anus,arschloch,arse,arsehole,ass,asses,asshole,asslick,assplay,ass-playauto-eroticism,autofellatio,autopederasty,b!+ch,b!tch,b00b,b17ch,b1tch,ballgag,ball-gag,bareback,barebacking,bastard,bdsm,beastilaity,bestiality,bi+ch,bi7ch,bitch,blowjob,blow-job,blowjobs,boiolas,bollock,bondage,boner,boob,boobies,boobs,breasts,buceta,bugger,buggery,bukake,bukakke,bulldyke,bull-dyke,bulldykes,bull-dykes,butt,butt-pirate,buttplug,butt-plug,buttplugs,butt-plugs,butts,c0ck,cabron,cameltoe,cameltoes,cawk,cazzo,chick,chicks,chink,clit,clitoris,clits,cock,coprophagy,coprophilia,cornhole,cornholes,corpophilia,corpophilic,creampie,cream-pie,creamypie,cum,cumming,cumpic,cumshot,cumshots,cunilingus,cunnilingus,cunt,d4mn,deepthroat,defecated,defecating,defecation,dick,dicks,dike,dildo,dildoes,dildos,dirsa,doggystyle,douche,douches,douching,dyke,dykes,dziwka,ejackulate,ekrem,ekto,enculer,enema,enemas,erection,erections,erotic,erotica,facesit,facesitting,facial,facials,faen,fag,fags,fanculo,fanny,fart,farted,farting,fcuk,feces,felch,felcher,felching,fellatio,fetish,fetishes,ficken,fisting,flikker,footjob,foreskin,fotze,foursome,fuck,fuk,futkretzn,fux0r,gag,gangbang,gang-bang,gay,genital,genitalia,genitals,gloryhole,glory-hole,gloryholes,glory-holes,gook,groupsex,gspot,g-spot,guiena,h0r,h4x0r,handjob,hand-job,hardcore,helvete,hoer,homosexual,honkey,hore,horny,huevon,incest,intercourse,interracial,jackass,jackoff,jizz,kankerkinky,klootzak,knulle,kraut,kuksuger,kurac,kurwa,kusi,kyrpa,l3i+ch,l3itch,labia,labial,lesbian,lesbians,lesbo,lolita,lolitas,mamhoon,masochism,masochist,masochistic,masturbat,masturbate,masturbation,mibun,mofo,monkleigh,motherfisher,mouliewop,muff,muie,mulkku,muschi,naked,nazis,necrophilia,nepesaurio,nigga,nigger,niggers,nipple,nipples,nude,nudes,nudity,nutsack,nympho,nymphomania,nymphomaniac,orgasm,orgasms,orgies,orgy,orospu,p0rn,paska,pecker,pederast,pederasty,pedophilia,pedophiliac,pee,peeing,penetration,penetrations,penis,perse,pervert,perverted,perverts,phuck,picka,pierdol,pillu,pimmel,pimpis,piss,pizda,poontsee,poop,porn,pr0n,precum,preteen,prick,pricks,prostitute,prostituted,prostitutes,prostituting,pusse,pussies,pussy,pussylips,pussys,qahbeh,queef,queer,queers,qweef,rape,raped,rapes,rapist,rautenberg,rimjob,sadism,sadist,scat,schaffer,scheiss,schlampe,schmuck,screw,scrotum,semen,sex,sh!t,sharmuta,sharmute,shemale,shipal,shit,shiz,sixtynine,sixty-nine,skribz,skurwysyn,slut,sluts,slutty,smut,sodomize,sodomy,softcore,spank,spanked,spanking,sperm,sphencter,spic,spierdalaj,squirt,squirted,squirting,strapon,strap-on,submissive,suck,sucked,sucking,suck-off,sucks,teets,teez,testicle,testicles,threesome,tit,tits,titt,titties,titty,tittys,tranny,transsexual,transvestite,twat,twats,twaty,twink,upskirt,urinated,urinating,urination,vagina,vaginas,vibrator,vittu,vulva,w00se,wank,wanking,watersports,whoar,whore,whores,wtf,xrated,x-rated,zabourah,crackz,crack,nude,naked,xxx,porn,warez,no cd,nocd,sexy,sex,sexy,gay,school,girl,hate,shit,nazi,masturbation,sucks,breas,hitler,fags,fag,babes,babe,erotic,dildo,suicide,topless,pussy,racist,nigger,lesbian,hardcore,orgy,sex,porn,bokep,memek,ngentot,lesbi,gay,nude,fuck,3gp,daniel brou,joanne yiokaris,pg ishazamuddin,sekolah menengah shan tao,dnwallace,david neil wallace,bugil,cerita seru,seks,cerita panas,cerita dewasa,hentai,xxx,setubuh,senggama,17tahun,17 tahun,nipples,incest,jebanje,lucah,ngewe,mesum,vagina,mujeres,x-girl,lancap,bogel,xes,lau xanh,telanjang,akka,pemerkosaan,hot girl,toket,birahi,bangla,choda,sabul,hot video,bikini,chudai,cipki,togel,malam pertama,malam pengantin,cerita hot,tukar pasangan,tukar istri,adult,ngecrot,kontol,maria ozawa,tanpa busana,desnuda,topless,nude,kelamin,hubungan intim,tetek,tits,kripalu';