const kartTemplate = `
    <div class="kart-cerceve">
        <div class="kart-onyuz">
            <img src="https://via.placeholder.com/100x100?text=?">
        </div>

        <div class="kart-arkayuz">
            <img src="">
        </div>
    </div>
`;

// const fotoNumaralari = [
//     10, 20, 30, 20,
//     10, 40, 40, 30
// ];

function rastgeleResim(){
    let dizi =[];
    for( let i=0; i<4;i++){
        dizi.push(Math.floor(Math.random()*100)+1)
    }
    
    dizi.push(...dizi); 
    return dizi;
    }

const resimNumaralari=rastgeleResim();

for (fotoNumara of resimNumaralari) {
    const yenikart = document.createElement("div");
    yenikart.innerHTML = kartTemplate;
    yenikart.classList.add("kart");
    yenikart.querySelector(".kart-arkayuz img").src = `https://lipsum.app/id/${fotoNumara}/100x100`;
    document.querySelector("div#oyun-cerceve").append(yenikart);

    //Her bir karta tıklandığında "kartTiklama" fonksiyonu çalışacak.
    yenikart.addEventListener("click", kartTiklama);
}

let sayac= 0;
function kartTiklama(olay) {
    //Tıklanan kartı seçilen olarak değişkene atayalım
    const secilenKart = olay.currentTarget;

    //Tıklanan kart eslesti classına sahipse daha önce başka kartla eşleşmiş ve zaten açık durumda demektir, işlem yapmayacağız.
    if (secilenKart.classList.contains("eslesti") === true) {
        return;
    }

    //Tıklanan ve açılan karta tekrar tıklanırsa işlem yapmayacağız.
    if (secilenKart.classList.contains("acik") === true) {
        return;
    }

    //Peşpeşe kartlara tıklandığında 2'den fazla kart tıklanmasını engellememiz gerekiyor.
    const tumAcikKartlar = document.querySelectorAll(".acik");
    if (tumAcikKartlar.length === 2) {
        return;
    }

    //Açık olan kart varsa seçelim.
    const acikKart = document.querySelector(".acik");

    //Hiç açık kart yoksa tıklanan karta açık class veriyoruz ve fonksiyondan çıkıyoruz.
    if (acikKart === null) {
        secilenKart.classList.add("acik");

        setTimeout(
            () => {
                secilenKart.classList.remove("acik");
            }, 1500
        );
        return;
    }

    //Daha önce bir açık kartımız varmış, son seçilen karta da açık class vererek tersini çevirelim.
    secilenKart.classList.add("acik");

    //Açık kartlara ait img etiketlerinin src görsel dosyaları eşleşiyor mu?
    const acikKartImg = acikKart.querySelector(".kart-arkayuz img");
    const secilenKartImg = secilenKart.querySelector(".kart-arkayuz img");

    if (acikKartImg.src === secilenKartImg.src) {
        //İki açık kart arasında eşleşme var.
        acikKart.classList.add("eslesti");
        secilenKart.classList.add("eslesti");

        acikKart.classList.remove("acik");
        secilenKart.classList.remove("acik");
        let puan=document.querySelector("span")
        sayac ++;
        puan.textContent=sayac + " Adet kart eşleşti..!"

        setTimeout(() => {
            acikKart.removeEventListener("click", kartTiklama);
            secilenKart.removeEventListener("click", kartTiklama);
        }, 1000);

        if(sayac==4){
          const img=document.createElement("img");
          img.src="img/congrate.gif";
          document.querySelector("body").appendChild(img);
          setTimeout(() => {
            img.remove();
          },
          5000);  
        }
    } else {

        
        //İki açık kartın görsel dosya adı birbirinden farklı, eşleşme yok, kartlar kapansın.
        setTimeout(() => {
            acikKart.classList.remove("acik");
            secilenKart.classList.remove("acik");
        }, 1500);
    }

}