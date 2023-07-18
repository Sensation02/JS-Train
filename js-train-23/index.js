// Композит (Composite) — це патерн програмування, який дозволяє створювати структуру об'єктів у вигляді дерева, де кожен об'єкт може бути окремим елементом або групою об'єктів.
// Ця структура називається "деревоподібною" через ієрархію "один-багато".

// Клас ContentContainer використовується для управління списком вкладених елементів контенту
class ContentContainer {
  // Створюємо властивість elements для зберігання вкладених елементів контенту. Початкове значення - порожній масив.
  elements = []
  // Створюємо addElement, який отримує element як параметр та додає його в масив elements.
  addElement(element) {
    this.elements.push(element)
  }
  // Створюємо removeElement, який отримує element як параметр, знаходить його індекс у масиві та видаляє, якщо елемент знайдено.
  removeElements() {
    this.elements.splice(this.elements.indexOf(element), 1)
  }
}

// Клас Message, що є розширенням класу ContentContainer. Використовується для створення повідомлень з текстом.
class Message extends ContentContainer {
  // Створюємо конструктор класу, який приймає content як параметр та ініціалізує його
  constructor(content) {
    super()
    this.content = content
  }
  // Створюємо метод display, який виводить ${this.content} для всіх елементів масиву
  display() {
    this.elements.forEach((element) => {
      console.log(element)
    })
  }
}

// Клас Article, що є розширенням класу ContentContainer. Використовується для створення статті з вкладеними елементами.
class Article extends ContentContainer {
  // Створюємо конструктор класу, який приймає title назву статті як параметр та ініціалізує об'єкт з нею
  constructor(title) {
    super()
    this.title = title
  }
  // Створюємо метод display, який виводить Стаття: ${this.title} для всіх елементів масиву
  display() {
    this.elements.forEach((element) => {
      console.log(element)
    })
  }
}

console.log('Завдання 1 ====================================')
// Після виконання розкоментуйте код нижче

// Створюємо об'єкт Article з назвою "Навчальна стаття"
const article = new Article('Навчальна стаття')

// Додаємо повідомлення до статті
article.addElement(new Message('Дуже корисна стаття'))
article.addElement(new Message('Дякую за чудовий матеріал!'))

// Додаємо вкладене повідомлення до першого повідомлення в статті
article.elements[0].addElement(new Message('Відповідь: Згоден!'))

// Виводимо інформацію про статтю та всі її вкладені елементи
article.display()

// Виводимо масив вкладених елементів статті
console.log(article.elements)
// ======================================================================================================
// Муха (Flyweight) — це патерн програмування, основна ідея якого полягає в тому, щоб спільно використовувати об'єкт-одиночка
// замість створення окремих унікальних об'єктів для кожного випадку використання

// Клас Group. Він використовує шаблон "Одиночка" та відповідає за створення груп товарів.
class Group {
  // Створюємо приватне статичне поле #groups використовується для зберігання усіх створених груп. Має початкове значени: пустий об'єкт
  //Об'єкт використовується для зберігання груп, де ключ - це назва групи, а значення - екземпляр групи.
  static #groups = {}

  // Створюмєо конструктор класу, який приймає назву групи як аргумент та ініціалізує поле this.name.
  constructor(name) {
    this.name = name
  }

  // Створюємо статичний метод create, який приймає назву групи name як аргумент.
  // Метод завжди повертає екземпляр групи з вказаною назвою.
  static create(name) {
    // Перевірка чи група з такою назвою ще не була створена
    if (!this.#groups[name]) {
      // то вона створюється та зберігається в полі #groups.
      this.#groups[name] = new Group(name)
    }
    // в кінці повертає #groups[name]
    return this.#groups[name]
  }
}

// Клас Product відповідає за створення продуктів.
class Product {
  // Створюємо конструктор класу, який приймає назву продукту name та групу group як аргументи та ініціалізує відповідні поля.
  constructor(name, group) {
    this.name = name
    this.group = group
  }

  // Робимо метод display, який виводить інформацію про продукт в консоль Продукт: ${this.name}, Група: ${this.group.name}.
  display() {
    console.log(`Продукт: ${this.name}, Група: ${this.group.name}`)
  }
}
console.log('Завдання 2 ====================================')
// Після виконання розкоментуйте код нижче

// Створення груп за допомогою методу Group.create. Цей метод гарантує, що кожна група з унікальною назвою буде створена лише один раз.
const electronics = Group.create('Електроніка')
const books = Group.create('Книги')
const electronics2 = Group.create('Електроніка')

// Виведення груп в консоль. Ми бачимо, що electronics та electronics2 - це один і той же об'єкт.
console.log(electronics, books, electronics2)
console.log(electronics === electronics2) // true

// Створення продуктів. Кожен продукт належить до певної групи.
const product1 = new Product('Ноутбук', electronics)
const product2 = new Product('Навушники', electronics)
const product3 = new Product('Воно', books)
const product4 = new Product('Смартфон', Group.create('Електроніка')) // тут створюється нова група або використовується вже створена

// Виведення продуктів в консоль.
product1.display()
product2.display()
product3.display()
product4.display()

// Перевірка, чи належать два продукти до однієї групи.
console.log(product1.group === product4.group) // true

// Фільтрація продуктів за групою. В даному випадку виводяться тільки продукти групи "Електроніка".
const list = [product1, product2, product3, product4].filter(
  (product) => product.group === Group.create('Електроніка'),
)

console.log(list) // виводиться список продуктів, що належать до групи "Електроніка"
// ======================================================================================================
// Шаблонний метод (Template Method) — це патерн програмування, який визначає загальну структуру алгоритму, залишаючи певні кроки реалізації підкласам.
// Клас-шаблон визначає основну логіку алгоритму, а підкласи можуть змінювати або розширювати окремі кроки.

// Клас TeaMaker відповідає за загальні дії, необхідні для приготування чаю.
class TeaMaker {
  // Робимо метод makeTea, який викликає всі кроки приготування чаю по черзі boilWater, addTeaLeaves, #steepTea,
  // pourIntoCup, addCondiments, serveTea.
  makeTea() {
    this.boilWater()
    this.addTeaLeaves()
    this.#steepTea()
    this.pourIntoCup()
    this.addCondiments()
    this.serveTea()
  }
  // Робимо метод boilWater, який відповідає за кип'ятіння води та виводить в консоль Кип'ятимо воду....
  boilWater() {
    console.log("Кип'ятимо воду....")
  }
  // Робимо метод addTeaLeaves, який відповідає за додавання чайних листків та виводить в консоль Додаємо чайні листки....
  addTeaLeaves() {
    console.log('Додаємо чайні листки....')
  }
  // Робимо метод steepTea, що відповідає за заварювання чаю та виводить в консоль Заварюємо чай....
  #steepTea() {
    console.log('Заварюємо чай....')
  }
  // Робимо метод pourIntoCup, що відповідає за переливання чаю в чашку та виводить в консоль Переливаємо чай в чашку....
  pourIntoCup() {
    console.log('Переливаємо чай в чашку....')
  }
  // Робимо метод addCondiments, що залишається пустим і може бути перевизначений у підкласах.
  addCondiments() {}
  // Робимо метод serveTea, що відповідає за подачу чаю та виводить в консоль Чай подається!.
  serveTea() {
    console.log('Чай подається!')
  }
}

// Клас GreenTeaMaker є підкласом класу TeaMaker та додає інгредієнти для зеленого чаю.
class GreenTeaMaker extends TeaMaker {
  // Робимо метод addCondiments, який виводить в консоль Додаємо мед, щоб приготувати зелений чай...
  addCondiments() {
    console.log('Додаємо мед, щоб приготувати зелений чай...')
  }
}

// Клас BlackTeaMaker є підкласом класу TeaMaker та додає інгредієнти для чорного чаю.
class BlackTeaMaker extends TeaMaker {
  // Робимо метод addCondiments, який виводить в консоль Додаємо мед, щоб приготувати чорний чай...
  addCondiments() {
    console.log('Додаємо мед, щоб приготувати чорний чай...')
  }
}

console.log('Завдання 3 ====================================')
// Після виконання розкоментуйте код нижче

// Створюємо екземпляри класів GreenTeaMaker та BlackTeaMaker.
const greenTeaMaker = new GreenTeaMaker()
greenTeaMaker.makeTea()

const blackTeaMaker = new BlackTeaMaker()
blackTeaMaker.makeTea()
// ======================================================================================================
// Відвідувач (Visitor) — це патерн програмування, який дозволяє додавати нові операції до групи об'єктів, не змінюючи самі об'єкти.
// Відвідувач розділяє алгоритм від представлення об'єктів, що дозволяє додавати нові операції, не змінюючи класи цих об'єктів.

// Клас Letter представляє об'єкт листа з назвою і текстом.
class Letter {
  // Створіть конструктор, що приймає назву листа title та його текстовий вміст text та ініціалізує відповідні поля
  // Записуємо аргумент title в властивість title, яка представляє назву листа в класі
  // Записуємо аргумент text в властивість text, яка представляє  текстовий вміст листа в класі
  constructor(title, text) {
    this.title = title
    this.text = text
  }
}

// Клас Picture представляє об'єкт зображення з назвою та розміром
class Picture {
  // Створіть конструктор, що приймає назву зображення title та його розмір size та ініціалізує відповідні поля
  // Записуємо аргумент title в властивість title, яка представляє назву зображення в класі
  //  Записуємо аргумент size в властивість size, яка представляє розмір зображення
  constructor(title, size) {
    this.title = title
    this.size = size
  }
}

// Клас Movie представляє об'єкт відеофільму з назвою та тривалістю
class Movie {
  // Конструктор приймає назву відеофільму title та його тривалість duration та ініціалізує відповідні поля
  // Записуємо аргумент title в властивість title, яка представляє назву відеофільму в класі
  // Записуємо аргумент duration в властивість duration, яка представляє тривалість відеофільму
  constructor(title, duration) {
    this.title = title
    this.duration = duration
  }
}

// Клас Portfolio представляє колекцію об'єктів, таких як листи, зображення та відеофільми
class Portfolio {
  // Створимо властивість elements, яка представляє список об'єктів в портфоліо, початкове значення пустий масив
  constructor() {
    this.elements = []
  }
  // Зрібть метод addElement, що приймає element та додає об'єкт до портфоліо
  addElement(element) {
    this.elements.push(element)
  }
  // Зробіть методи readLetter, що приймає letter та виводить в консоль: "Лист: ${letter.title}, Розмір: ${letter.text.length} символів"
  readLetter(letter) {
    console.log(`Лист: ${letter.title}, Розмір: ${letter.text.length} символів`)
  }
  // Зробіть методи readPicture, що приймає letter та виводить в консоль: "Картина: ${picture.title}, Розмір: ${picture.size} KB"
  readPicture(picture) {
    console.log(`Картина: ${picture.title}, Розмір: ${picture.size} KB`)
  }
  // Зробіть методи readMovie, що приймає letter та виводить в консоль: "Фільм: ${movie.title}, Тривалість: ${movie.duration} хвилин"
  readMovie(movie) {
    console.log(`Фільм: ${movie.title}, Тривалість: ${movie.duration} хвилин`)
  }
  // Зробіть метод readElements, який читає інформацію про всі об'єкти в портфоліо в залежності від того якого класу елемент викликає readLetter, readPicture, readMovie
  // Робимо ітерацію for де є змінна element в яку приходять елементи this.elements
  // Через instanceof по черзі через if та instanceof перевіряємо відношення element до кожного класу.
  // Якщо element є елементом певного класу, то викликати відповідний метод для читання об'єкту певного класу
  readElements() {
    for (let element of this.elements) {
      if (element instanceof Letter) {
        this.readLetter(element)
      } else if (element instanceof Picture) {
        this.readPicture(element)
      } else if (element instanceof Movie) {
        this.readMovie(element)
      }
    }
  }
}

console.log('Завдання 4 ====================================')
// Після виконання розкоментуйте код нижче

// Створюємо екземпляр класу Portfolio
const myPortfolio = new Portfolio()

// Створюємо різні об'єкти
const letter = new Letter('My Letter', 'Hello, this is a letter.')
const picture = new Picture('My Picture', 2048)
const movie = new Movie('My Movie', 120)

// Додаємо об'єкти до портфоліо
myPortfolio.addElement(letter)
myPortfolio.addElement(picture)
myPortfolio.addElement(movie)

// Виводимо всі об'єкти в портфоліо
console.log(myPortfolio.elements)

// Читаємо інформацію про всі об'єкти в портфоліо
myPortfolio.readElements()
// ==========================================================================================================
// Адаптер (Adapter) — це патерн програмування, який дозволяє об'єктам з інтерфейсом несумісним з іншими об'єктами працювати разом,
// перетворюючи інтерфейс одного об'єкта на інтерфейс, очікуваний іншим об'єктом.

// Клас BankTransfer представляє собою систему для здійснення банківських переказів
class BankTransfer {
  // Зробіть метод initiateTransfer, який приймає amount та відповідає за ініціювання банківського переказу
  // Він приймає суму переказу як параметр
  // Для ініціювання банківського переказу спершу обчислюється сума з урахуванням комісії calculatedAmount = this.calculateFee(amount)
  // Виводимо інформацію про ініціювання банківського переказу Ініціюємо банківський переказ: $${calculatedAmount}
  initiateTransfer(amount) {
    const calculatedAmount = this.calculateFee(amount)
    console.log(`Ініціюємо банківський переказ: $${calculatedAmount}`)
  }
  // Зробіть метод calculateFee, який відповідає за розрахунок комісії за переказ
  // Він приймає amount переказу як параметр та повертає число після розрахування комісії
  // Логіка розрахунку комісії за переказ amount * 1.02
  // Припустимо, комісія становить 2% від суми переказу
  calculateFee(amount) {
    return amount * 1.02
  }
}

// Клас WalletTransfer представляє собою систему для здійснення переказів з гаманця
class WalletTransfer {
  // Створіть метод processTransfer, який відповідає за здійснення переказу з гаманця
  // Він приймає суму переказу як параметр
  // Виводимо інформацію про здійснення переказу з гаманця Здійснюємо переказ з гаманця: $${amount}
  processTransfer(amount) {
    console.log(`Здійснюємо переказ з гаманця: $${amount}`)
  }
}

// Клас TransferAdapter виступає адаптером, який дозволяє нам користуватися
// методами WalletTransfer так, ніби це BankTransfer.
class TransferAdapter {
  // Робимо конструктор, що приймає об'єкт transferSystem типу WalletTransfer
  // Зберігаємо посилання на об'єкт WalletTransfer у властивості transferSystem
  constructor(transferSystem) {
    this.transferSystem = transferSystem
  }
  // Робимо метод initiateTransfer, який адаптує API WalletTransfer до API BankTransfer.
  // Він приймає amount як аргумент та повертає результат виконання переказу.
  // Викликаємо допоміжний метод calculateFee для обчислення комісії за переказ та результат записуєм в константу calculatedAmount
  // Викликаємо метод processTransfer об'єкту WalletTransfer з calculatedAmount.
  // В результаті повертаємо результат виконання переказу.
  initiateTransfer(amount) {
    const calculatedAmount = this.calculateFee(amount)
    return this.transferSystem.processTransfer(calculatedAmount)
  }
  // Створюємо метод calculateFee, що приймає amount та обчислює суму комісії за переказ amount * 1.2, засновуючись на вхідній сумі.
  // Повертаємо amount * 1.2
  calculateFee(amount) {
    return amount * 1.2
  }
}
console.log('Завдання 5 ====================================')
// Після виконання розкоментуйте код нижче

// Створимо екземпляри BankTransfer
const purchase1 = new BankTransfer()
purchase1.initiateTransfer(1000)

const purchase2 = new BankTransfer()
purchase2.initiateTransfer(10)
// ==========================================================================================================
// Стратегія (Strategy) — це патерн програмування, який дозволяє визначати різні алгоритми та забезпечує можливість обміну їх під час виконання програми.

// Клас Basket представляє кошик для покупок з певною стратегією знижки
class Basket {
  // Створимо конструктор приймає, що стратегію знижки discountPlan як параметр
  // Властивість discountPlan отримує значення стратегії знижки, яке було передано конструктору
  constructor(discountPlan) {
    this.discountPlan = discountPlan
  }
  // Створюємо новий пустий масив для зберігання товарів (goods) в кошику
  goods = []
  // Робимо метод addGood, що приймає один параметр - good, який потрібно додати до масиву
  // Додаємо новий товар в масив товарів
  addGood(good) {
    this.goods.push(good)
  }
  // Робимо метод calculateTotalPrice, що розраховує загальну вартість товарів в кошику з урахуванням знижки
  // За допомогою метода reduce ми сумуємо вартість всіх товарів в масиві
  // Застосовуємо знижку до загальної вартості за допомогою метода applyDiscount нашого об'єкта discountPlan
  calculateTotalPrice() {
    const totalPrice = this.goods.reduce((acc, good) => acc + good.price, 0)
    return this.discountPlan.applyDiscount(totalPrice)
  }
}

// Клас RegularDiscountPlan: стратегія знижки для постійних клієнтів
class RegularDiscountPlan extends Basket {
  // Робимо метод applyDiscount, що приймає ціну price як параметр
  // Повертає ціну з урахуванням знижки в 10% price * 0.9
  applyDiscount(price) {
    return price * 0.9
  }
}

//Клас VIPDiscountPlan: стратегія знижки для VIP клієнтів
class VIPDiscountPlan extends Basket {
  // Робимо метод applyDiscount, що приймає ціну price як параметр
  // Повертає ціну з урахуванням знижки в 20% price * 0.8
  applyDiscount(price) {
    return price * 0.8
  }
}

// Клас NewClientDiscountPlan: стратегія знижки для нових клієнтів
class NewClientDiscountPlan extends Basket {
  // Робимо метод applyDiscount, що приймає ціну price як параметр
  // Повертає ціну з урахуванням знижки в 5% price * 0.95
  applyDiscount(price) {
    return price * 0.95
  }
}

console.log('Завдання 6 ====================================')
// Після виконання розкоментуйте код нижче

// Створення нового екземпляру кошика зі стратегією знижки для нових клієнтів
const basket1 = new Basket(new NewClientDiscountPlan())

// Додавання товарів до кошика
basket1.addGood({ name: 'Product 1', price: 100 })
basket1.addGood({ name: 'Product 2', price: 50 })

// Розрахунок і виведення загальної вартості товарів з урахуванням знижки
console.log(basket1.calculateTotalPrice())
// ==========================================================================================================
// Ітератор (Iterator) — це патерн програмування, який надає спосіб послідовного доступу до елементів колекції без розкриття його внутрішньої структури.

// Клас Employee відповідає за створення об'єктів працівників. Кожен працівник має своє ім'я, посаду та зарплату.
class Employee {
  // Створимо конструктор, що використовується для ініціалізації об'єктів класу. Він приймає три параметри: name, position та salary.
  // Передаємо аргумент в this.name, this.position та this.salary - це властивості класу. Вони ініціалізуються значеннями, переданими в конструктор.
  constructor(name, position, salary) {
    this.name = name
    this.position = position
    this.salary = salary
  }
}

// Клас EmployeeGroup використовується для створення груп працівників. Він містить список працівників.
class EmployeeGroup {
  // Задаємо властивість employees, яке призначене для зберігання працівників. Він ініціалізується як порожній масив.
  constructor() {
    this.employees = []
  }
  // Робимо метод addEmployee, який додає працівника до групи. Він приймає один параметр employee - об'єкт типу Employee.
  // Цей метод додає об'єкт працівника до масиву employees, використовуючи метод push.
  addEmployee(employee) {
    this.employees.push(employee)
  }
}

// Клас EmployeeIterator відповідає за ітерацію по групі працівників.
class EmployeeIterator {
  // Робимо властивість #employees - це масив працівників, по якому ми будемо ітерувати. Він ініціалізується у конструкторі.
  #employees = []
  // Робимо властивість #currentIndex, яка вказує на поточну позицію в масиві працівників. Він ініціалізується зі значенням 0.
  #currentIndex = 0
  // Конструктор приймає один параметр employeeGroup - об'єкт типу EmployeeGroup. Він ініціалізує властивість #employees this.#employees = employeeGroup.employees.
  constructor(employeeGroup) {
    this.#employees = employeeGroup.employees
  }
  // Створимо метод #hasNext, який перевіряє, чи є в масиві працівників наступний елемент для ітерації.
  // Він повертає true, якщо поточний індекс менший за довжину масиву, і false в протилежному випадку.
  #hasNext() {
    return this.#currentIndex < this.#employees.length
  }
  // Робимо метод next, який повертає наступного працівника в масиві та збільшує #currentIndex на 1 якщо є наступний елемент, інакше повертає null.
  next() {
    if (this.#hasNext()) {
      return this.#employees[this.#currentIndex++]
    }
    return null
  }
  // Робимо метод list, який використовується для виведення імен всіх працівників в групі.
  list() {
    let result = ''
    let employee = this.next()
    while (employee !== null) {
      result += employee.name
      employee = this.next()
      if (employee !== null) {
        result += ', '
      }
    }
    return result
  }
}

console.log('Завдання 7 ====================================')
// Після виконання розкоментуйте код нижче

// Створюємо нову групу працівників.
const employeeGroup = new EmployeeGroup()

// Додаємо нових працівників до групи, використовуючи метод addEmployee.
employeeGroup.addEmployee(new Employee('John Doe', 'Manager', 5000))
employeeGroup.addEmployee(new Employee('Jane Smith', 'Developer', 4000))

// Створюємо новий ітератор для групи працівників.
const employeeIterator = new EmployeeIterator(employeeGroup)

// Виводимо імена всіх працівників в групі, використовуючи метод list.
console.log(employeeIterator.list())
// ==========================================================================================================
// Медіатор (Mediator) — це патерн програмування, який визначає об'єкт, який інкапсулює взаємодію між групою об'єктів. Медіатор сприяє слабкій залежності між цими об'єктами,
// дозволяючи спілкуватися з ними через централізовану точку.

// Клас User відповідає за користувача, який може відправляти повідомлення.
class User {
  // Створюємо конструктор класу, який приймає name та messenger як параметри та ініціалізує їх
  constructor(name, messenger) {
    this.name = name
    this.messenger = messenger
  }
  // Робимо метод sendMessage який відправляє повідомлення за допомогою відповідного месенджера, та виводить в консоль `${this.name} відправив повідомлення ${message}`.
  // Він приймає один параметр - message - повідомлення, яке потрібно відправити за допомогою методу sendMessage.
  sendMessage(message) {
    this.messenger.sendMessage(message)
    console.log(`${this.name} відправив повідомлення ${message}`)
  }
  // Метод receiveMessage приймає аргументи user,message та виводить в консоль ${this.name} отримав повідомлення від ${user.name}: ${message}
  receiveMessage(user, message) {
    console.log(
      `${this.name} отримав повідомлення від ${user.name}: ${message}`,
    )
  }
}

// Клас SMSMessenger відповідає за відправку повідомлень за допомогою SMS.
class SMSMessenger {
  // Створюємо статичний метод sendMessage який приймає один параметр - message, та виводить в консоль `Відправлено SMS: ${message}`
  static sendMessage(message) {
    console.log(`Відправлено SMS: ${message}`)
  }
}

// Клас EmailMessenger відповідає за відправку повідомлень за допомогою Email.
class EmailMessenger {
  // Створюємо статичний метод EmailMessenger який приймає один параметр - message, та виводить в консоль `Відправлено Email: ${message}`
  static sendMessage(message) {
    console.log(`Відправлено Email: ${message}`)
  }
}

console.log('Завдання 7 ====================================')
// Після виконання розкоментуйте код нижче

// Створюємо двох користувачів - John та Jane - які відправляють повідомлення за допомогою різних месенджерів.
const john = new User('John', SMSMessenger)
const jane = new User('Jane', EmailMessenger)

// John відправляє повідомлення за допомогою SMS.
john.sendMessage('Привіт!') // Виведе: Відправлено SMS: [John]: Привіт!

// Jane відправляє повідомлення за допомогою Email.
jane.sendMessage('Привіт!') // Виведе: Відправлено Email: [Jane]: Привіт!
