let selector = document.querySelector("#tel")
let im = new Inputmask("+7 (999) 999-99-99")
im.mask(selector)

let validation = new JustValidate("form")

validation.addField("#name", [
    {
        rule: "required",
        errorMessage: "Введите имя!"
    },
    {
        rule: "minLength",
        value: 2,
        errorMessage: "Минимум 2 символа!"
    }
]).addField("#tel", [
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length > 0)
    },
    errorMessage: 'Введите телефон'
  },
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length === 10)
    },
    errorMessage: 'Введите телефон полностью'
  }
]).addField("#msg", [
  {
    rule: "required",
    errorMessage: "Введите сообщение!"
  }
]).onSuccess(async function() {
    let data = {
        name: document.getElementById("name").value,
        tel: document.getElementById("tel").value,
        msg: document.getElementById("msg").value
    }

    let response = await fetch("mail.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

    let result = await response.text()
    
    alert(result)
})

const popup = () => {
    const openBtn = document.querySelectorAll('.btn'),
        overlay = document.querySelector('.overlay'),
        closeBtn = document.querySelector('.cross'),
        body = document.querySelector('body')

    openBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            overlay.classList.add('open')
            body.classList.add('no-scroll')
        })

        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('open')
            body.classList.remove('no-scroll')
        })
    })
}

popup()

$(document).ready(function(){
    $('.inside__content_slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});

const toggleBlock = (
    {selector = '', btnTrigger = null}
) => {
    const searchSelector = btnTrigger ?? selector
    $(searchSelector).click(function () {
        const changesSelectorClass = btnTrigger ? $(selector) : $(this);
        changesSelectorClass.toggleClass('active');
    });
}

$(document).ready(function () {
    const needToggleBlocks = [
        {selector: '.faq__element'},
        {selector: '.faq__spoiler', btnTrigger: '.faq-buttons'},
    ];

    for (let selector in needToggleBlocks) {
        toggleBlock(needToggleBlocks[selector]);
    }
})