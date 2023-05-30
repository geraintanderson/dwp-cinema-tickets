# DWP Cinema Tickets

This is part of the DWP coding challenge. The work has been completed in JavaScript, so see the `cinema-tickets-javascript` directory for my solution.

Where I thought it was best to add additional functionality not defined in the spec I have tagged the code with `// NOTE:`. Ordinarily this would be checked with a PM or the stakeholders before development.

It was unclear what should be done with `InvalidPurchaseException`. Given that the spec states that there are no defects in the external providers I have not handled errors there, although in a real world this would need to be wrapped with a try/catch and would very likely be asynchronous too. Instead I used the `InvalidPurchaseException` for validation errors, and modified the `InvalidPurchaseException` class to handle this. In the validation functions I used the inbuilt JavaScript error types, which is consistent with the third party implementations. I then wrapped these in the TicketService with a try/catch and explicitly changed the validation errors into a `InvalidPurchaseException`. I don't think this adds much, but as this is a coding exercise and the error had already been imported into the service, it looked like I should use it.

There's also scope to re-use some of the validation across the services (assuming the validation is the same for all use cases).

I have added eslint for linting and set the rules to be consistent with the existing third party services.

## Quickstart

* Clone the repository and navigate to the `cinema-tickets-javascript` directory.
* Install dependencies using `npm install`
* Run the tests using `npm test` to run in watch mode or `npm run test:ci` to run once.
