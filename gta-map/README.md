# GTA Interactive Map (Starter Project)

Yeh ek simple interactive map hai jo **Next.js + Leaflet** se bana hai.
Abhi isme **placeholder map** aur **sample (jhoote) markers** hain. Asli GTA 6 data nahi hai.

Isme yeh cheezein kaam karti hain:
- Map ko zoom aur drag karna
- Categories ke hisaab se markers dikhana/chupana
- Marker par click karke "Mil gaya (found)" tick karna
- Progress browser mein save hona (page refresh par bhi rahe)
- Mobile par bhi chalna

---

## Folder structure

```
gta-map/
├── app/
│   ├── layout.js        <- page ka basic dhancha
│   ├── page.js          <- main page (sidebar + map)
│   └── globals.css      <- design/colors
├── components/
│   └── MapView.js       <- Leaflet map ka code
├── data/
│   └── markers.js       <- categories aur markers (YAHAN data badalna hai)
├── public/
│   └── placeholder-map.svg  <- placeholder map image
├── next.config.js
├── package.json
└── README.md
```

---

## STEP 1: Node.js install karein

1. Browser mein jayen: **https://nodejs.org**
2. **LTS** wala button download karein (green button).
3. Download hui file kholen aur **Next, Next, Install** karte jayen (default settings theek hain).
4. Install ke baad computer **restart** kar lein.

Check karne ke liye (Step 3 ke baad terminal khulne par) yeh likhein:

```
node -v
```

Agar koi version number aaye (jaise `v20.x.x`), to Node.js sahi install hai.

## STEP 2: Visual Studio Code install karein

1. Jayen: **https://code.visualstudio.com**
2. **Download** par click karein aur install karein.
3. Install ke waqt "Add to PATH" aur "Open with Code" wale options tick rehne dein.

## STEP 3: Project kholen

1. Is project ka folder (`gta-map`) apne computer par kisi jagah rakhen, jaise Desktop par. Agar zip mili hai to pehle **Extract** karein.
2. VS Code kholen: **File > Open Folder** aur `gta-map` folder chunen.
3. Terminal kholen: upar menu mein **Terminal > New Terminal**.

## STEP 4: Project chalayen

Terminal mein yeh do commands ek ek karke likhein (har ek ke baad Enter dabayen):

```
npm install
```

(Yeh 1-3 minute le sakta hai. Warnings aaye to fikr na karein, errors na hon to theek hai.)

```
npm run dev
```

Jab likha aaye `Local: http://localhost:3000`, browser mein kholen:

**http://localhost:3000**

Aapko map nazar aana chahiye. Band karne ke liye terminal mein `Ctrl + C` dabayen.

---

## STEP 5: Vercel par free host karein

Pehle code ko GitHub par rakhna hota hai.

### A) GitHub par upload
1. **https://github.com** par free account banayen.
2. Upar `+` > **New repository** par click karein. Naam: `gta-map`. **Create repository** dabayen.
3. VS Code ke terminal mein yeh commands likhein (pehle `git` install hona chahiye: https://git-scm.com):

```
git init
git add .
git commit -m "first version"
git branch -M main
git remote add origin https://github.com/APNA-USERNAME/gta-map.git
git push -u origin main
```

(`APNA-USERNAME` ki jagah apna GitHub username likhein. GitHub shayad login maange.)

### B) Vercel se connect
1. **https://vercel.com** par jayen, **Sign Up > Continue with GitHub**.
2. **Add New > Project** par click karein.
3. Apni `gta-map` repository ke saamne **Import** dabayen.
4. Kuch change na karein, seedha **Deploy** dabayen.
5. 1-2 minute baad aapko ek link milega, jaise `gta-map.vercel.app`. Yehi aapki live website hai.

Ab jab bhi aap code badal kar `git push` karenge, Vercel khud website update kar dega.

> Note: Vercel ka free (Hobby) plan personal, non-commercial use ke liye hai. Jab aap ads se paisa kamana shuru karein, to Vercel ki taaza terms check karein. Zaroorat padne par paid plan ya doosra host dekhna parega.

---

## Apna data kaise badlein

Sab markers aur categories `data/markers.js` mein hain.

Naya marker add karne ke liye `markers` list mein ek line add karein:

```js
{ id: "c4", category: "collectible", x: 500, y: 500, title: "Mera Marker", description: "Kuch likhein." },
```

- `id` har marker ka alag hona chahiye
- `category` wohi hona chahiye jo `categories` mein hai
- `x`: left se right (0 se 1000)
- `y`: neeche se upar (0 se 1000)

Naya category add karne ke liye `categories` mein ek line add karein.

## Asli map image kaise lagayen (game release ke baad)

1. Map ki image `public/` folder mein rakhen, jaise `public/map.jpg`.
2. `components/MapView.js` mein `"/placeholder-map.svg"` ki jagah `"/map.jpg"` likhein.
3. Agar image square nahi hai, to `data/markers.js` mein `MAP_SIZE` aur `MapView.js` ke `bounds` ko image ke size ke hisaab se badalna hoga (mujhse pooch lein).

**Zaroori:** Sirf wohi map/images use karein jin ka aapko haq ho ya jinki ijazat ho. Game ke official assets seedha copy karne se copyright ka masla ho sakta hai.

---

## Aage kya?

1. Supabase se login aur online progress save karna
2. Users ke markers submit karna
3. Ads lagana (Google AdSense)
4. SEO aur community features

Jab aap yeh MVP chala len, mujhe batayein, hum agla step banayenge.

---

## Aam masle

- **`npm` is not recognized**: Node.js install nahi hua ya computer restart nahi kiya.
- **Port 3000 busy hai**: `npm run dev -- -p 3001` chalayen, phir `localhost:3001` kholen.
- **Map khali/kaala dikhe**: page refresh karein (`Ctrl + Shift + R`).
