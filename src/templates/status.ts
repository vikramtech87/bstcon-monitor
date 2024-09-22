const statusXml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
	<soap:Header>
		<UserDetails xmlns="http://www.cmch-vellore.edu/">
			<userName>{{Username}}</userName>
			<password>{{Password}}</password>
			<program>{{Program}}</program>
		</UserDetails>
	</soap:Header>
	<soap:Body>
		<CONFONLINEPAYSTATUS xmlns="http://www.cmch-vellore.edu/">
			<regno>{{RegistrationNumber}}</regno>
			<transid>{{TransactionId}}</transid>
			<conference>{{ConferenceCode}}</conference>
			<confyear>2024</confyear>
			<bankname>{{BankName}}</bankname>
		</CONFONLINEPAYSTATUS>
	</soap:Body>
</soap:Envelope>`;

export default statusXml;
