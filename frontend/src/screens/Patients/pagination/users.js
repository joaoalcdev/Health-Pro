
import axios from "axios"

import { apiBaseUrl } from "../../../api/apiConfig"

const users = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'test@gmail.com' },
  { id: 2, firstName: 'Jane', lastName: 'Doe', email: '' },
  { id: 3, firstName: 'Alice', lastName: 'Doe', email: '' },
  { id: 4, firstName: 'Bob', lastName: 'Doe', email: '' },
  { id: 5, firstName: 'Charlie', lastName: 'Doe', email: '' },
  { id: 6, firstName: 'David', lastName: 'Doe', email: '' },
  { id: 7, firstName: 'Eve', lastName: 'Doe', email: '' },
  { id: 8, firstName: 'Frank', lastName: 'Doe', email: '' },
  { id: 9, firstName: 'Grace', lastName: 'Doe', email: '' },
  { id: 10, firstName: 'Heidi', lastName: 'Doe', email: '' },
  { id: 11, firstName: 'Ivan', lastName: 'Doe', email: '' },
  { id: 12, firstName: 'Judy', lastName: 'Doe', email: '' },
  { id: 13, firstName: 'Kevin', lastName: 'Doe', email: '' },
  { id: 14, firstName: 'Linda', lastName: 'Doe', email: '' },
  { id: 15, firstName: 'Mary', lastName: 'Doe', email: '' },
  { id: 16, firstName: 'Nathan', lastName: 'Doe', email: '' },
  { id: 17, firstName: 'Oscar', lastName: 'Doe', email: '' },
  { id: 18, firstName: 'Peter', lastName: 'Doe', email: '' },
  { id: 19, firstName: 'Quincy', lastName: 'Doe', email: '' },
  { id: 20, firstName: 'Rose', lastName: 'Doe', email: '' },
  { id: 21, firstName: 'Steve', lastName: 'Doe', email: '' },
  { id: 22, firstName: 'Tom', lastName: 'Doe', email: '' },
  { id: 23, firstName: 'Ursula', lastName: 'Doe', email: '' },
  { id: 24, firstName: 'Victor', lastName: 'Doe', email: '' },
  { id: 25, firstName: 'Wendy', lastName: 'Doe', email: '' },
  { id: 26, firstName: 'Xavier', lastName: 'Doe', email: '' },
  { id: 27, firstName: 'Yvonne', lastName: 'Doe', email: '' },
  { id: 28, firstName: 'Zack', lastName: 'Doe', email: '' },
  { id: 29, firstName: 'Abe', lastName: 'Doe', email: '' },
  { id: 30, firstName: 'Bart', lastName: 'Doe', email: '' },
  { id: 31, firstName: 'Carl', lastName: 'Doe', email: '' },
  { id: 32, firstName: 'Drew', lastName: 'Doe', email: '' },
  { id: 33, firstName: 'Eva', lastName: 'Doe', email: '' },
  { id: 34, firstName: 'Faye', lastName: 'Doe', email: '' },
  { id: 35, firstName: 'Gina', lastName: 'Doe', email: '' },
  { id: 36, firstName: 'Hank', lastName: 'Doe', email: '' },
  { id: 37, firstName: 'Iris', lastName: 'Doe', email: '' },
  { id: 38, firstName: 'Jack', lastName: 'Doe', email: '' },
  { id: 39, firstName: 'Karl', lastName: 'Doe', email: '' },
  { id: 40, firstName: 'Lori', lastName: 'Doe', email: '' },
  { id: 41, firstName: 'Mona', lastName: 'Doe', email: '' },
  { id: 42, firstName: 'Nick', lastName: 'Doe', email: '' },
  { id: 43, firstName: 'Omar', lastName: 'Doe', email: '' },
  { id: 44, firstName: 'Paul', lastName: 'Doe', email: '' },
  { id: 45, firstName: 'Quinn', lastName: 'Doe', email: '' },
  { id: 46, firstName: 'Ruth', lastName: 'Doe', email: '' },
  { id: 47, firstName: 'Sam', lastName: 'Doe', email: '' },
  { id: 48, firstName: 'Tim', lastName: 'Doe', email: '' },
  { id: 49, firstName: 'Uma', lastName: 'Doe', email: '' },
  { id: 50, firstName: 'Vince', lastName: 'Doe', email: '' },
  { id: 51, firstName: 'Walt', lastName: 'Doe', email: '' },
  { id: 52, firstName: 'Xena', lastName: 'Doe', email: '' },
  { id: 53, firstName: 'Yara', lastName: 'Doe', email: '' },
  { id: 54, firstName: 'Zane', lastName: 'Doe', email: '' },
  { id: 55, firstName: 'Ava', lastName: 'Doe', email: '' },
  { id: 56, firstName: 'Ben', lastName: 'Doe', email: '' },
  { id: 57, firstName: 'Cara', lastName: 'Doe', email: '' },
  { id: 58, firstName: 'Dale', lastName: 'Doe', email: '' },
  { id: 59, firstName: 'Ella', lastName: 'Doe', email: '' },
  { id: 60, firstName: 'Finn', lastName: 'Doe', email: '' },
  { id: 61, firstName: 'Gail', lastName: 'Doe', email: '' },
  { id: 62, firstName: 'Hugo', lastName: 'Doe', email: '' },
  { id: 63, firstName: 'Inga', lastName: 'Doe', email: '' },
  { id: 64, firstName: 'Jill', lastName: 'Doe', email: '' },
  { id: 65, firstName: 'Kirk', lastName: 'Doe', email: '' },
  { id: 66, firstName: 'Liam', lastName: 'Doe', email: '' },
  { id: 67, firstName: 'Mona', lastName: 'Doe', email: '' },
  { id: 68, firstName: 'Nina', lastName: 'Doe', email: '' },
  { id: 69, firstName: 'Omar', lastName: 'Doe', email: '' },
  { id: 70, firstName: 'Paul', lastName: 'Doee', email: '' },
  { id: 71, firstName: 'Quinn', lastName: 'Doe', email: '' },
  { id: 72, firstName: 'Ruth', lastName: 'Doe', email: '' },
  { id: 73, firstName: 'Sam', lastName: 'Doe', email: '' },
  { id: 74, firstName: 'Tim', lastName: 'Doe', email: '' },
  { id: 75, firstName: 'Uma', lastName: 'Doe', email: '' },
  { id: 76, firstName: 'Vince', lastName: 'Doe', email: '' },
  { id: 77, firstName: 'Walt', lastName: 'Doe', email: '' },
  { id: 78, firstName: 'Xena', lastName: 'Doe', email: '' },
  { id: 79, firstName: 'Yara', lastName: 'Doe', email: '' },
  { id: 80, firstName: 'Zane', lastName: 'Doe', email: '' },
  { id: 81, firstName: 'Ava', lastName: 'Doe', email: '' },
  { id: 82, firstName: 'Ben', lastName: 'Doe', email: '' },
  { id: 83, firstName: 'Cara', lastName: 'Doe', email: '' },
  { id: 84, firstName: 'Dale', lastName: 'Doe', email: '' },
  { id: 85, firstName: 'Ella', lastName: 'Doe', email: '' },
  { id: 86, firstName: 'Finn', lastName: 'Doe', email: '' },
  { id: 87, firstName: 'Gail', lastName: 'Doe', email: '' },
  { id: 88, firstName: 'Hugo', lastName: 'Doe', email: '' },
  { id: 89, firstName: 'Inga', lastName: 'Doe', email: '' },
  { id: 90, firstName: 'Jill', lastName: 'Doe', email: '' },
  { id: 91, firstName: 'Kirk', lastName: 'Doe', email: '' },
  { id: 92, firstName: 'Liam', lastName: 'Doe', email: '' },
  { id: 93, firstName: 'Mona', lastName: 'Doe', email: '' },
  { id: 94, firstName: 'Nina', lastName: 'Doe', email: '' },
  { id: 95, firstName: 'Omar', lastName: 'Doe', email: '' },
  { id: 96, firstName: 'Paul', lastName: 'Doe', email: '' },
  { id: 97, firstName: 'Quinn', lastName: 'Doe', email: '' },
  { id: 98, firstName: 'Ruth', lastName: 'Doe', email: '' },
  { id: 99, firstName: 'Sam', lastName: 'Doe', email: '' },
  { id: 100, firstName: 'Tim', lastName: 'Doe', email: '' },
]

export const getUsers = function (page, limit) {
  let array = [];
  for (let i = (page - 1) * limit; i < (page * limit) && users[i]; i++) {
    array.push(users[i])
  }

  return array
}

export const getUsersData = async function (page, limit, showDeleted) {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/patients?page=${page}&limit=${limit}&showDeleted=${showDeleted}`)
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export const getLength = function () {
  return users.length
}
