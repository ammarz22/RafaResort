
const fNameInput = document.getElementById("fName");
const lNameInput = document.getElementById("lName");
const emailInput = document.getElementById("email");

// room book 
const inDateInput = document.getElementById("inDate");
const outDateInput = document.getElementById("outDate");
const noAdultsInput = document.getElementById("noAdults");
const noChildrenInput = document.getElementById("noChildren");
const kidsMealInput = document.getElementById("kidsMeal");
const singleRoomInput = document.getElementById("single");
const doubleRoomInput = document.getElementById("double");
const tripleRoomInput = document.getElementById("triple");
const wifiCheckInput = document.getElementById("wifiCheck");
const poolCheckInput = document.getElementById("poolCheck");
const gardenCheckInput = document.getElementById("gardenCheck");
const extraBedInput = document.getElementById("extraBed");
const addFavButton = document.getElementById("addFav");
const advFavButton = document.getElementById("advaddFav");
const bookBtn = document.getElementById("bookBtn");
const loyaltyCheckBtn = document.getElementById("checkloyaltyBtn");


//Table input
const RoombookingTable = document.getElementById("booktable");
const adventurebooktable = document.getElementById('adventurebooktable');

// adventutre book
const adventureSelect = document.getElementById("adventureSelect");
const localAdultsInput = document.getElementById("localAdults");
const localKidsInput = document.getElementById("localKids");
const foreignAdultsInput = document.getElementById("foreignAdults");
const foreignKidsInput = document.getElementById("foreignKids");
const diveAdultsCheckbox = document.getElementById("diveAdults");
const diveKidsCheckbox = document.getElementById("diveKids");
const promoCodeInput = document.getElementById("promoCode");
const bookAdventureBtn = document.getElementById("bookAdventure");
const totalAmountElement = document.getElementById("totalAmount");
const loyaltyField = document.getElementById('loyaltyfield');


//  event listeners
fNameInput.addEventListener("input", calculateTotalCost);
lNameInput.addEventListener("input", calculateTotalCost);
emailInput.addEventListener("input", calculateTotalCost);
inDateInput.addEventListener("input", calculateTotalCost);
outDateInput.addEventListener("input", calculateTotalCost);
inDateInput.addEventListener("input", calculateDuration);
outDateInput.addEventListener("input", calculateDuration);
noChildrenInput.addEventListener("input", calculateTotalCost);
kidsMealInput.addEventListener("input", calculateTotalCost);
singleRoomInput.addEventListener("input", calculateTotalCost);
doubleRoomInput.addEventListener("input", calculateTotalCost);
tripleRoomInput.addEventListener("input", calculateTotalCost);
wifiCheckInput.addEventListener("change", calculateTotalCost);
poolCheckInput.addEventListener("change", calculateTotalCost);
gardenCheckInput.addEventListener("change", calculateTotalCost);
extraBedInput.addEventListener("change", calculateTotalCost);
addFavButton.addEventListener("click",saveRoomFav);
advFavButton.addEventListener("click", saveAdvFav);
loyaltyCheckBtn.addEventListener("click", checkLoyaltyPoints);

adventureSelect.addEventListener("change", calculateAdventureCost);
localAdultsInput.addEventListener("input", calculateAdventureCost);
localKidsInput.addEventListener("input", calculateAdventureCost);
foreignAdultsInput.addEventListener("input", calculateAdventureCost);
foreignKidsInput.addEventListener("input", calculateAdventureCost);
diveAdultsCheckbox.addEventListener("change", calculateAdventureCost);
diveKidsCheckbox.addEventListener("change", calculateAdventureCost);
promoCodeInput.addEventListener("input", calculateTotalCost);
bookAdventureBtn.addEventListener("click", () => {
    calculateTotalCost();
    calculateAdventureCost();
    adventurebookadd();
    calculateOverallCost();
    adventurebooktable.scrollIntoView({behavior : 'smooth', block : 'center'});
});

bookBtn.addEventListener("click", () => {
    roombookadd();
    UpdateLoyaltyPoints();
    RoombookingTable.scrollIntoView({behavior : 'smooth', block : 'center'});
});

function calculateDuration() {
    const checkInDate = new Date(inDateInput.value);
    const checkOutDate = new Date(outDateInput.value);

    // time difference in milliseconds
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();

    // number of days
    const durationInDays = timeDifference / (1000 * 3600 * 24);

    // duration of stay
    console.log(`Duration of stay: ${durationInDays} days`);

    return durationInDays;
}

// Calculate total cost 
function calculateTotalCost() {
    const durationInDays = calculateDuration();

    const singleRoomCost = 25000.00;
    const doubleRoomCost = 35000.00;
    const tripleRoomCost = 40000.00;
    const kidsMealCost = 5000.00; 
    const extraBedCost = 8000.00;
    const promoCodeDiscount = 0.05;

    // Get all input values 
    const singleRoomQty = parseFloat(singleRoomInput.value) || 0;
    const doubleRoomQty = parseFloat(doubleRoomInput.value) || 0;
    const tripleRoomQty = parseFloat(tripleRoomInput.value) || 0;
    const kidsMealQty = parseFloat(kidsMealInput.value) || 0;

    let totalCost = 0;

    // Calculation for room costs
    totalCost += singleRoomQty * singleRoomCost;
    totalCost += doubleRoomQty * doubleRoomCost;
    totalCost += tripleRoomQty * tripleRoomCost;

    // Calculation for  kids meal 
    totalCost += kidsMealQty * kidsMealCost;

    // checkbox value
    if (extraBedInput.checked) {
        totalCost += extraBedCost;
    }
        // promo code application
    if (promoCodeInput.value === "Promo123") {
        totalCost *= (1 - promoCodeDiscount);
    }

    totalCost *= durationInDays;
        // Update the total cost
    console.log(`Total Room Cost: ${totalCost.toFixed(2)} LKR`);
    totalAmountElement.textContent = `Total Room Cost: ${totalCost.toFixed(2)} LKR`;

    return totalCost;
}

function calculateAdventureCost() {
    const divingLocalAdultsCost = 5000.00;
    const divingLocalKidsCost = 2000.00;
    const divingForeignAdultsCost = 10000.00;
    const divingForeignKidsCost = 5000.00;
    const guideAdultExtraCost = 1000.00;
    const guideKidsExtraCost = 500.00;

    // Get input values for adventure
    const localAdultsQty = parseFloat(localAdultsInput.value) || 0;
    const localKidsQty = parseFloat(localKidsInput.value) || 0;
    const foreignAdultsQty = parseFloat(foreignAdultsInput.value) || 0;
    const foreignKidsQty = parseFloat(foreignKidsInput.value) || 0;

    let totalCost = 0;

    // Calculation for diving costs
    totalCost += localAdultsQty * divingLocalAdultsCost;
    totalCost += localKidsQty * divingLocalKidsCost;
    totalCost += foreignAdultsQty * divingForeignAdultsCost;
    totalCost += foreignKidsQty * divingForeignKidsCost;

    // guide for dive
    if (diveAdultsCheckbox.checked) {
        totalCost += guideAdultExtraCost * localAdultsQty;
    }
    if (diveKidsCheckbox.checked) {
        totalCost += guideKidsExtraCost * localKidsQty;
    }

    // Update the total adventure cost
    console.log(`Total Adventure Cost: ${totalCost.toFixed(2)} LKR`);
    totalAmountElement.textContent = `Total Adventure Cost: ${totalCost.toFixed(2)} LKR`;

    return totalCost;
}

const bookingHistory = [];
//Booking Table
function roombookadd(){
    console.log("Book button clicked");
    const name = `${fNameInput.value} ${lNameInput.value}`;
    const checkInDate = inDateInput.value;
    const checkOutDate = outDateInput.value;
    const AdultsInput = noAdultsInput.value || 0;
    const ChildrenInput = noChildrenInput.value || 0;
    const KidsInput = kidsMealInput.value || 0;
    const singleinput = singleRoomInput.value || 0;
    const doubleinput = doubleRoomInput.value || 0;
    const tripleinput = tripleRoomInput.value || 0;
    const wifi = wifiCheckInput.checked ? 'Yes' : 'No';
    const pool = poolCheckInput.checked ? 'Yes' : 'No';
    const garden = gardenCheckInput.checked ? 'Yes' : 'No';
    const extrabed = extraBedInput.checked ? 'Yes' : 'No';
    const promocode = promoCodeInput.value ? 'Yes' : 'No';
    const totalcost = calculateTotalCost();

    const details = {
        name: name,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        adults: AdultsInput,
        children: ChildrenInput,
        kids: KidsInput,
        single: singleinput,
        double: doubleinput,
        triple: tripleinput,
        wifi: wifi,
        pool: pool,
        garden: garden,
        extraBed: extrabed,
        promocode: promocode,
        totalCost: totalcost,
    };

    const detailsArray = Object.values(details);
    bookingHistory.push(details);

    const labels = {
        name: 'Name',
        checkInDate: 'Check-in Date',
        checkOutDate: 'Check-Out Date',
        adults: 'No. of Adults',
        children: 'No. of Children',
        kids: 'Above 5 Years',
        single: 'Single Rooms',
        double: 'Double Rooms',
        triple: 'Triple Rooms',
        wifi: 'WiFi',
        pool: 'Pool View',
        garden: 'Garden View',
        extraBed: 'Extra Bed',
        promocode: 'Promo Code',
        totalCost: 'Total Cost',
    };

    const newRow = RoombookingTable.insertRow(-1);
    for (let i = 0; i < detailsArray.length; i++) {
        console.log(detailsArray[i]);
        const cell = newRow.insertCell();
        cell.textContent = detailsArray[i];
        cell.setAttribute('data-label', labels[Object.keys(details)[i]]);
      }
      alert("Your Room Booking has been Confirmed");
    
}

//Adventure Booking Table
function adventurebookadd(){
    const nameInput = fNameInput.value
    const AdventureInput = adventureSelect.value || 0;
    const AdultsInput = localAdultsInput.value || 0;
    const KidsInput = localKidsInput.value || 0;
    const AdultsForeignInput = foreignAdultsInput.value || 0;
    const KidsForeignInput = foreignKidsInput.value || 0;
    const DiveAdults = diveAdultsCheckbox.checked ? 'Yes' : 'No';
    const DiveKids = diveKidsCheckbox.checked ? 'Yes' : 'No';
    const totalCost = calculateAdventureCost();

    
    const details = {
        name: nameInput,
        adventure: AdventureInput,
        adults: AdultsInput,
        kids: KidsInput,
        foreignsdults: AdultsForeignInput,
        foreignkids: KidsForeignInput,
        diveadult: DiveAdults,
        divekids: DiveKids,
        cost: totalCost,
    };

    const detailsArray = Object.values(details);
    bookingHistory.push(details);

    const labels = {
        name: `Name`,
        adventure:` Choice of Adventure`,
        adults: `No of Adults`,
        kids:` No of Kids`,
        foreignsdults: `No of Foreign Adults`,
        foreignkids: `No of Foreign Kids`,
        diveadult: `No of Diving Adults`,
        divekids: `No of Diving Kids`,
        total: `Total-Amount`,
    };

    const newRow = adventurebooktable.insertRow(-1);
    for (let i = 0; i < detailsArray.length; i++) {
        console.log(detailsArray[i]);
        const cell = newRow.insertCell();
        cell.textContent = detailsArray[i];
        cell.setAttribute('data-label', labels[Object.keys(details)[i]]);
      }
    
      alert("Your Adventure Booking has been Confirmed");

}

// Date validation 

document.getElementById('inDate').min = new Date().toISOString().split('T')[0]
document.getElementById('outDate').min = new Date().toISOString().split('T')[0]


function validateCheckOut() {
    var inDateValue = document.getElementById('inDate').value;
    var outDateValue = document.getElementById('outDate').value;

    // selected check-out date with the check-in date
    if (inDateValue && outDateValue && outDateValue <= inDateValue) {
        alert("Check-out date must be later than the check-in date.");
        document.getElementById('outDate').value = "";
    }
}


function saveRoomFav(){
    const roomBooking = {
        checkInDate: inDateInput.value,
        checkOutDate: outDateInput.value,
        singleRooms: singleRoomInput.value || 0,
        doubleRooms: doubleRoomInput.value || 0,
        tripleRooms: tripleRoomInput.value || 0,
        adults: noAdultsInput.value || 0,
        children: noChildrenInput.value || 0,
        kidsmeal: kidsMealInput.value || 0,
        wifi: wifiCheckInput.checked ? 'Yes' : 'No',
        extraBed: extraBedInput.checked ? 'Yes' : 'No',
        poolView: poolCheckInput.checked ? 'Yes' : 'No',
        gardenView: gardenCheckInput.checked ? 'Yes' : 'No',
        promoCode: promoCodeInput.value,
    }
    alert("Your choices for rooms have been favourited!");
    localStorage.setItem('favouriteRoomBooking', JSON.stringify(roomBooking));
};

function saveAdvFav(){
    const advBooking = {
        typeofadventure: adventureSelect.value,
        localAdults: localAdultsInput.value || 0,
        localKids: localKidsInput.value || 0,
        foreignAdults: foreignAdultsInput.value || 0,
        foreignKids: foreignKidsInput.value || 0,
        DiveAdult: diveAdultsCheckbox.checked ? 'Yes' : 'No',
        DiveKids: diveKidsCheckbox.checked ? 'Yes' : 'No',
    }
    alert("Your choices for adventure have been favourited!");
    localStorage.setItem('favouriteAdvBooking', JSON.stringify(advBooking));
};

// loyalty point function
function UpdateLoyaltyPoints() {
    // number fo room
    const singleRoomQty = parseFloat(singleRoomInput.value) || 0;
    const doubleRoomQty = parseFloat(doubleRoomInput.value) || 0;
    const tripleRoomQty = parseFloat(tripleRoomInput.value) || 0;

    const totalRooms = singleRoomQty + doubleRoomQty + tripleRoomQty;
    let loyaltyPoints;

    // room greeater than 3
    if (totalRooms > 3) {
        // 20 points
        loyaltyPoints = totalRooms * 20;

        // store in loccal storage
        localStorage.setItem("loyaltyPoints", loyaltyPoints);
    }
        
}

// initialize loyalty points
function checkLoyaltyPoints() {
    // take points from storage
    const storedLoyaltyPoints = localStorage.getItem("loyaltyPoints");

    // display loyalty
    if (storedLoyaltyPoints) {
        loyaltyField.textContent = `${storedLoyaltyPoints} Points`;
    }
}

const totalBookAmountElement = document.getElementById("totalBookAmount");

function calculateOverallCost() {
    // get total
    const roomBookingCost = calculateTotalCost() ||0;
    const adventureBookingCost = calculateAdventureCost() ||0;

    // add room and adventure cost
    const overallCost = roomBookingCost + adventureBookingCost;

    // overall cost
    console.log(`Overall Cost: ${overallCost.toFixed(2)} LKR`);
    totalBookAmountElement.textContent = `Overall Cost: ${overallCost.toFixed(2)} LKR`;

    return overallCost;
}
