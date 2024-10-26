$(document).ready(function() {
    // Sample initial data
    let cars = [
        {
            id: 1,
            name: "Percy Jackson",
            parentGod: "Poseidon",
            carType: "Aqua Chariot",
            abilities: "Water-powered engine, underwater navigation",
            rarity: "Legendary"
        },
        {
            id: 2,
            name: "Annabeth Chase",
            parentGod: "Athena",
            carType: "Wisdom Walker",
            abilities: "Strategic navigation, invisible cloaking",
            rarity: "Epic"
        }
    ];

    // Render all cars
    function renderCars(carsToRender = cars) {
        const grid = $('#carsGrid').empty();
        
        carsToRender.forEach(car => {
            const card = $(`
                <div class="card rounded-lg overflow-hidden shadow-lg" data-id="${car.id}">
                    <div class="rarity-${car.rarity.toLowerCase()} text-white px-2 py-1 text-sm">
                        ${car.rarity}
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-amber-900 mb-2">${car.name}</h3>
                        <p class="text-amber-800"><strong>God:</strong> ${car.parentGod}</p>
                        <p class="text-amber-800"><strong>Type:</strong> ${car.carType}</p>
                        <p class="text-amber-800"><strong>Abilities:</strong> ${car.abilities}</p>
                        <div class="mt-4 flex justify-end space-x-2">
                            <button class="edit-car bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600">
                                Edit
                            </button>
                            <button class="delete-car bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            `);
            grid.append(card);
        });
    }

    // Search functionality
    $('#searchBar').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        const filteredCars = cars.filter(car => 
            car.name.toLowerCase().includes(searchTerm) ||
            car.parentGod.toLowerCase().includes(searchTerm) ||
            car.carType.toLowerCase().includes(searchTerm)
        );
        renderCars(filteredCars);
    });

    // Modal handling
    let currentCarId = null;

    function showModal(car = null) {
        currentCarId = car?.id || null;
        if (car) {
            $('#carForm [name="name"]').val(car.name);
            $('#carForm [name="parentGod"]').val(car.parentGod);
            $('#carForm [name="carType"]').val(car.carType);
            $('#carForm [name="abilities"]').val(car.abilities);
            $('#carForm [name="rarity"]').val(car.rarity);
        } else {
            $('#carForm')[0].reset();
        }
        $('#carModal').removeClass('hidden');
    }

    // Add new car button
    $('#addNewCar').click(() => showModal());

    // Edit car button
    $(document).on('click', '.edit-car', function() {
        const carId = $(this).closest('.card').data('id');
        const car = cars.find(c => c.id === carId);
        showModal(car);
    });

    // Delete car button
    $(document).on('click', '.delete-car', function() {
        const carId = $(this).closest('.card').data('id');
        cars = cars.filter(c => c.id !== carId);
        renderCars();
    });

    // Close modal
    $('.cancel-modal').click(() => {
        $('#carModal').addClass('hidden');
    });

    // Form submission
    $('#carForm').submit(function(e) {
        e.preventDefault();
        const formData = {
            name: $('[name="name"]').val(),
            parentGod: $('[name="parentGod"]').val(),
            carType: $('[name="carType"]').val(),
            abilities: $('[name="abilities"]').val(),
            rarity: $('[name="rarity"]').val()
        };

        if (currentCarId) {
            // Update existing car
            cars = cars.map(car => 
                car.id === currentCarId ? {...formData, id: currentCarId} : car
            );
        } else {
            // Add new car
            formData.id = Date.now();
            cars.push(formData);
        }

        renderCars();
        $('#carModal').addClass('hidden');
    });

    // Initial render
    renderCars();
});