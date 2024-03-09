const dateAndTimeNow = new Date()
const year = dateAndTimeNow.getFullYear()
const month = dateAndTimeNow.getMonth() + 1
const day = dateAndTimeNow.getDate()
let hour = dateAndTimeNow.getHours() -2
const hinta_span = document.querySelector('#hintanyt')
const laske_button = document.querySelector('button')
const tunnit_input = document.querySelector('#tunnit')
const saunahinta_span = document.querySelector('#saunahinta')
const marginaali_tai_kiintea_input = document.querySelector('#marginaali_tai_kiintea')
const siirtohinta_input = document.querySelector('#siirtohinta')
const radio_form = document.querySelector('form')
const sahkovero = 2.793
let laskuri = 1
let hinta1 = 0
let hinta2 = 0
let hinta3 = 0
let hinta4 = 0
let hinta5 = 0
let hinta6 = 0


const twoDigits = (number) => (number < 10 ? `0${number}` : `${number}`)

const checktunti = () => {
    if(hour === -2){
        hour = 22
    }
    if(hour === -1){
        hour = 23
    }
}

checktunti()

const params = `${year}-${twoDigits(month)}-${twoDigits(day)}T${twoDigits(hour)}:00:00.000Z`;
const url = 'https://sahkotin.fi/prices?fix&vat&start=' +params

const getPrice = () => {
    const address = url
    axios.get(address)
        .then(response => {
            const json = response.data
            hinta1 = json.prices[0].value
            hinta2 = json.prices[1].value
            hinta3 = json.prices[2].value
            hinta4 = json.prices[3].value
            hinta5 = json.prices[4].value
            hinta6 = json.prices[5].value
            let modattutunti = hour + 3
            for(let i = 1; i < 6; i++) {
                let obj = json.prices[i];
                const checkmodattu = () => {
                    if(modattutunti > 24){
                        modattutunti = 1
                    }
                    if (modattutunti === 24) {
                        modattutunti = 0
                    } 
                    }
                    checkmodattu()
                    document.getElementsByTagName("table")[0].innerHTML+= "<tr><td>"+modattutunti+".00"+"</td><td>"+json.prices[i].value +" snt/kWh"+"</td><td>"
                        modattutunti++
            }
            hinta_span.innerHTML = hinta1

        }).catch(error => {
            alert(error)
        })
} 

getPrice() 

laske_button.addEventListener('click',() => {
calculate()
})

const updateUI = (vaihtuvalabel) => {

    if ("input[sahkotyyppi='porssi']:checked".val) {
        document.querySelector('#mikasahko').innerHTML = vaihtuvalabel
    }   
        else {
        document.querySelector('#mikasahko').innerHTML = vaihtuvalabel
    }
}

radio_form.addEventListener('click',() => {
    const sahkotyyppi = radio_form['sahkotyyppi'].value

    switch (sahkotyyppi) {
        case 'porssi':
            laskuri = 1
            updateUI('Sähköyhtiön marginaali:')
            marginaali_tai_kiintea_input.value = "0.0";
            break
        case 'kiintea':
            laskuri = 2
            updateUI('Kiinteä sähkön hinta:')
            marginaali_tai_kiintea_input.value = "0.0";
            break
    }
})

const calculate = () => {

    const tunnit = tunnit_input.value
    const siirtohinta = siirtohinta_input.value
    const kiukaan_kulutus_eka_tunti = 5
    const kiukaan_kulutus_muut_tunnit = 4
        if(laskuri===1){
        const marginaali = marginaali_tai_kiintea_input.value
        tulos1 = hinta1 * kiukaan_kulutus_eka_tunti + marginaali * kiukaan_kulutus_eka_tunti + siirtohinta * kiukaan_kulutus_eka_tunti + sahkovero * kiukaan_kulutus_eka_tunti
        tulos2 = hinta2 * kiukaan_kulutus_muut_tunnit + marginaali * kiukaan_kulutus_muut_tunnit + siirtohinta * kiukaan_kulutus_muut_tunnit + sahkovero * kiukaan_kulutus_muut_tunnit + tulos1
        tulos3 = hinta3 * kiukaan_kulutus_muut_tunnit + marginaali * kiukaan_kulutus_muut_tunnit + siirtohinta * kiukaan_kulutus_muut_tunnit + sahkovero * kiukaan_kulutus_muut_tunnit + tulos2
        tulos4 = hinta4 * kiukaan_kulutus_muut_tunnit + marginaali * kiukaan_kulutus_muut_tunnit + siirtohinta * kiukaan_kulutus_muut_tunnit + sahkovero * kiukaan_kulutus_muut_tunnit + tulos3
        tulos5 = hinta5 * kiukaan_kulutus_muut_tunnit + marginaali * kiukaan_kulutus_muut_tunnit + siirtohinta * kiukaan_kulutus_muut_tunnit + sahkovero * kiukaan_kulutus_muut_tunnit + tulos4
        tulos6 = hinta6 * kiukaan_kulutus_muut_tunnit + marginaali * kiukaan_kulutus_muut_tunnit + siirtohinta * kiukaan_kulutus_muut_tunnit + sahkovero * kiukaan_kulutus_muut_tunnit + tulos5
        }
         else{
            const kiinteahinta = marginaali_tai_kiintea_input.value
            tulos1 = kiinteahinta * kiukaan_kulutus_eka_tunti + siirtohinta * kiukaan_kulutus_eka_tunti + sahkovero * kiukaan_kulutus_eka_tunti
            tulos2 = kiinteahinta * kiukaan_kulutus_muut_tunnit + siirtohinta * kiukaan_kulutus_muut_tunnit + sahkovero * kiukaan_kulutus_muut_tunnit + tulos1
            tulos3 = kiinteahinta * kiukaan_kulutus_muut_tunnit + siirtohinta * kiukaan_kulutus_muut_tunnit + sahkovero * kiukaan_kulutus_muut_tunnit + tulos2
            tulos4 = kiinteahinta * kiukaan_kulutus_muut_tunnit + siirtohinta * kiukaan_kulutus_muut_tunnit + sahkovero * kiukaan_kulutus_muut_tunnit + tulos3
            tulos5 = kiinteahinta * kiukaan_kulutus_muut_tunnit + siirtohinta * kiukaan_kulutus_muut_tunnit + sahkovero * kiukaan_kulutus_muut_tunnit + tulos4
            tulos6 = kiinteahinta * kiukaan_kulutus_muut_tunnit + siirtohinta * kiukaan_kulutus_muut_tunnit + sahkovero * kiukaan_kulutus_muut_tunnit + tulos5
    }
    if(tunnit > 0 && tunnit < 7) {
        switch (tunnit) {
            case '1':
               eurot = tulos1 / 100
               saunahinta_span.innerHTML = eurot.toFixed(2) + "€"
                break
            case '2':
                eurot = tulos2 / 100
               saunahinta_span.innerHTML = eurot.toFixed(2) + "€"
                break
            case '3':
                eurot = tulos3 / 100
               saunahinta_span.innerHTML = eurot.toFixed(2) + "€"
                break
            case '4':
                eurot = tulos4 / 100
               saunahinta_span.innerHTML = eurot.toFixed(2) + "€"
                break
            case '5':
                eurot = tulos5 / 100
               saunahinta_span.innerHTML = eurot.toFixed(2) + "€"
                break
            case '6':
                eurot = tulos6 / 100
               saunahinta_span.innerHTML = eurot.toFixed(2) + "€"
                break
        }
    }
    else{
        alert('Voit laskea vain tunneilla 1-6')
    }
}