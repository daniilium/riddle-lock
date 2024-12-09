# Riddle Lock 🔒🤔

## **Блокировка с загадками для продуктивности**

**Riddle Lock** помогает контролировать ваше внимание на отвлекающих сайтах. Когда вы проводите определённое время на сайте, появляется загадка. Решите её, чтобы продолжить, или закройте сайт и вернитесь к делам. Простое и эффективное средство для повышения концентрации!

### 🛠️ **Фичи:**

- **🎯 Блокировка по части URL**  
  Блокируйте конкретные разделы сайта, например, `https://www.youtube.com/shorts`, оставляя остальной сайт доступным.

- **🧩 Загадки для доступа**  
  Чтобы продолжить пользоваться сайтом, нужно решить загадку.

- **⏱️ Настройка времени без загадок**  
  Установите, сколько времени сайт будет доступен после правильного ответа.

## **Riddle-Based Blocking for Productivity**

**Riddle Lock** helps you regain control of your attention on distracting websites. After spending a certain amount of time on a site, a riddle appears. Solve it to continue, or leave the site and refocus. A simple and effective tool to boost your concentration!

---

### 🛠️ **Features:**

- **🎯 URL Path-Based Blocking**  
  Block specific sections of a website, like `https://www.youtube.com/shorts`, without blocking the entire site.

- **🧩 Riddles for Access**  
  Solve a riddle to keep using the site.

- **⏱️ Set Time Without Riddles**  
  Configure how long the site remains accessible after solving a riddle correctly.

---

## TODO:
- Создавать свои собственные загадки
- Сделать настройку чтобы показывать правильный ответ
## Диаграмма последовательностей
```mermaid
sequenceDiagram
    participant Background as Фоновый Скрипт
    participant Content as Контентный Скрипт
    actor User as Пользователь

loop
  Content->>Background: Показать загадку для домена?

  %% домена нет в списке
  break
    Note left of Background: Кейс "Домена нет в списке"

    Background->>Content: Домена нет в списке
    Content->>Content: Выйти из цикла до смены домена сайта
  end

  alt
    Note left of Background: Кейс "Есть время БЕЗ загадки"

    Background->>Content: Нет, время без загадки ещё не вышло
    Content->>User: Загадку НЕ показывать
    User->>User: Пользуется сайтом
    Note over User: Вернуться к шагу "Показать загадку для домена?"
  end

  Background->>Content: Да, вот загадка
  Content->>User: Показать модальное окно с загадкой
  User->>Content: Вводит ответ
  Content->>Background: Отправить результат

  Background->>Background: Проверить ответ

  %% Успешное решение
  Note left of Background: Кейс "Успешное решение"

  Background->>Background: Сброс таймера для показа следующей загадки
  Background->>Content: Оповещает, что ответ правильный
  Content->>User: Уведомление об успехе и закрыть окно

  %% Неудачное решение
  alt
    Note left of Background: Кейс "Неудачное решение"

    Background->>Content: Ответ неправильный
    Content->>User: Уведомить об ошибке и показать другую задачку
    Note over User: Вернуться к шагу пользователя "Вводит ответ"
  end

  %% Пользователь уходит с сайта
  alt 
    Note left of Background: Кейс "Уход с сайта"

    User->>User: Закрыть страницу сайта
  end

end
```
