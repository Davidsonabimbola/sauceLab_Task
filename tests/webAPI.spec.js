
  const { test, expect, request } = require('@playwright/test');

//PET API

// using POST request 
test('TC_007 Using POST request to add a new pet to the store', {tag:'@post'}, async () => {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Perform the POST request
  const response = await apiContext.post('https://petstore.swagger.io/v2/pet', {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      id: 0,
      category: {
        id: 0,
        name: 'string'
      },
      name: 'doggie',
      photoUrls: [
        'string'
      ],
      tags: [
        {
          id: 0,
          name: 'string'
        }
      ],
      status: 'available'
    }
  });

  // Print the response status and body 
  console.log(`Status: ${response.status()}`);
  console.log(`Body: ${await response.text()}`);

  //assertions
  expect(response.status()).toBe(200); 
  expect(response).toBeTruthy()
  // print response Id
  const loginResponse = await response.json()
  const id =await loginResponse.id
  console.log(id)
});


// using GET request
test('TC_008 Using GET request to find Pets by status',{tag:'@get'}, async () => {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Perform the GET request
  const response = await apiContext.get('https://petstore.swagger.io/v2/pet/findByStatus', {
    params: { status: 'available' }, // Query parameters
    headers: {
      'accept': 'application/json',
    },
  });

  // Print the response status and body 
  console.log(`Status: ${response.status()}`)
  //assertion
  expect(response.status()).toBe(200); 
  
});


// using PUT request
test('TC_009 Using PUT to update an existing pet data',{tag:'@put'}, async () => {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Define the request body
  const requestBody = {
    id: 5,
    category: {
      id: 100,
      name: 'string'
    },
    name: 'doggie',
    photoUrls: [
      'string'
    ],
    tags: [
      {
        id: 0,
        name: 'string'
      }
    ],
    status: 'available'
  };

  // Perform the PUT request
  const response = await apiContext.put('https://petstore.swagger.io/v2/pet', {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: requestBody,
  });

  // Print the response status and body 
  console.log(`Status: ${response.status()}`);
  console.log(`Body: ${await response.text()}`);

  //assertion
  expect(response.status()).toBe(200); 
  
});



// STORE API

// using GET request
test('TC_010 Using GET request to retrieve  store inventory ',{tag:'@get'}, async () => {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Perform the GET request
  const response = await apiContext.get('https://petstore.swagger.io/v2/store/inventory', {
    headers: {
      'accept': 'application/json',
    },
  });

  // Print the response status and body 
  console.log(`Status: ${response.status()}`);
  console.log(`Body: ${await response.text()}`);

  //assertion
  expect(response.status()).toBe(200); 
  
});



// using DELETE request
test('TC_011 Using DELETE request to delete purchase order by Id',{tag:'@delete'}, async () => {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Perform the DELETE request
  const response = await apiContext.delete('https://petstore.swagger.io/v2/store/order/2', {
    headers: {
      'accept': 'application/json',
    },
  });

  // Print the response status and body 
  console.log(`Status: ${response.status()}`);
  console.log(`Body: ${await response.text()}`);

  //assertion
  expect(response.status()).toBe(404); 
  
});





test('TC_012 Using POST request to place an order for a pet',{tag:'@post'}, async () => {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Define the request body
  const requestBody = {
    id: 2004,
    petId: 0,
    quantity: 0,
    shipDate: '2024-09-05T14:48:25.001Z',
    status: 'placed',
    complete: true
  };

  // Perform the POST request
  const response = await apiContext.post('https://petstore.swagger.io/v2/store/order', {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: requestBody,
  });

  // Print the response status and body 
  console.log(`Status: ${response.status()}`);
  console.log(`Body: ${await response.text()}`);

  //assertion
  expect(response.status()).toBe(200); 
  
});


