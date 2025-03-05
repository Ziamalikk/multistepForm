document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".step");
    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle("active", index === stepIndex);
        });
    }

    function validateStep(step) {
        let isValid = true;
        const requiredFields = step.querySelectorAll("input[required], select[required]");

        requiredFields.forEach(field => {
            const errorSpan = field.nextElementSibling;

            if (field.required && !field.value.trim()) {
                isValid = false;
                field.style.border = "1px solid red";
                errorSpan.textContent = "This field is required.";
                errorSpan.style.display = "block";
            } else {
                field.style.border = "";
                errorSpan.style.display = "none";
            }

            if (field.type === 'email') {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.border = "1px solid red";
                    errorSpan.textContent = "This field is required.";
                    errorSpan.style.display = "block";
                } else if (!validateEmail(field.value.trim())) {
                    isValid = false;
                    field.style.border = "1px solid red";
                    errorSpan.textContent = "Please enter a valid email address.";
                    errorSpan.style.display = "block";
                } else {
                    field.style.border = "";
                    errorSpan.style.display = "none";
                }
            }

            if (field.type === 'tel') {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.border = "1px solid red";
                    errorSpan.textContent = "This field is required.";
                    errorSpan.style.display = "block";
                } else if (!validatePhoneNumber(field.value.trim())) {
                    isValid = false;
                    field.style.border = "1px solid red";
                    errorSpan.textContent = "Please enter a valid 10-digit phone number starting with 7, 8, or 9.";
                    errorSpan.style.display = "block";
                } else {
                    field.style.border = "";
                    errorSpan.style.display = "none";
                }
            }
        });

        return isValid;
    }

    // Email validation
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Phone number validation (10 digits)
    function validatePhoneNumber(phoneNumber) {
        const phonePattern = /^[789]\d{9}$/;
        return phonePattern.test(phoneNumber);
    }

    document.getElementById("next").addEventListener("click", function () {
        if (validateStep(steps[currentStep])) {
            currentStep++;
            showStep(currentStep);
        }
    });

    document.getElementById("previous").addEventListener("click", function () {
        currentStep--;
        showStep(currentStep);
    });

    document.getElementById("next2").addEventListener("click", function () {
        if (validateStep(steps[currentStep])) {
            currentStep++;
            showStep(currentStep);
            showSummary();
        }
    });

    document.getElementById("previous2").addEventListener("click", function () {
        currentStep--;
        showStep(currentStep);
    });

    document.getElementById("category").addEventListener("change", function () {
        showAdditionalFields();
    });

    function showAdditionalFields() {
        const selectedCategory = document.getElementById("category").value;
        document.querySelectorAll(".additional-field").forEach(field => {
            field.style.display = "none";
        });

        if (selectedCategory) {
            document.getElementById(`${selectedCategory}-fields`).style.display = "block";
        }
    }
 
    function showSummary() {
        const summaryElement = document.getElementById("summary");
        const form = document.getElementById("personal-info-form");
        let summary = "";

        form.querySelectorAll("input, select").forEach(field => {
            if (field.type === "radio") {
                if (field.checked) {
                    summary += `<p><strong>${field.name.replace(":", "")}:</strong> ${field.value}</p>`;
                }
            } else {
                if (field.value) {
                    const label = field.previousElementSibling ? field.previousElementSibling.textContent.replace(":", "") : field.name.replace(":", "");
                    summary += `<p><strong>${label}:</strong> ${field.value}</p>`;
                }
            }
        });

        summaryElement.innerHTML = summary;
    }

    showStep(currentStep);
    showAdditionalFields();
});
