
export const lastRow = {
  uuid: 0,
  first: "initial",
  last: "initial",
  country: "France",
  email: "initial",
  salary: 0,
}

// export const columnsClear = (selectedDisplay?: { marketing: number[], hr: number[], first: number[], last: number[], country: number[], email: number[], salary: number[] }): ColumnsType<Employee> => [
//   {
//     title: "First name",
//     key: "first",
//     render: (employee: Employee) => {
//       if (employee.first === "initial") {
//         return <Form.Item
//           name="first"
//           rules={[
//             {
//               whitespace: true,
//               required: true,
//               message: "Please provide a first name",
//             },
//           ]}
//           style={{ marginBottom: 0 }}
//         >
//           <Input placeholder="Firstname" />
//         </Form.Item>
//       } else if (!selectedDisplay || selectedDisplay.first.includes(employee.uuid)) {
//         return employee.first
//       } else if (employee.first === "Fail to decrypt") {
//          return <Tag icon={<IoLockClosed />}>{employee.first}</Tag>
//       } else {
//         return <div className="light">{employee.first}</div>
//       }
//     },
//   },
//   {
//     title: "Last name",
//     key: "last",
//     render: (employee: Employee) => {
//       if (employee.last === "initial") {
//         return <Form.Item
//           name="last"
//           rules={[
//             {
//               whitespace: true,
//               required: true,
//               message: "Please provide a last name",
//             },
//           ]}
//           style={{ marginBottom: 0 }}
//         >
//           <Input placeholder="Lastname" />
//         </Form.Item>
//       } else if (!selectedDisplay || selectedDisplay.last.includes(employee.uuid)) {
//         return employee.last
//       } else if (employee.last === "Fail to decrypt") {
//         return <Tag icon={<IoLockClosed />}>{employee.last}</Tag>
//       } else {
//         return <div className="light">{employee.last}</div>
//       }
//     }
//   },
//   {
//     title: "Country",
//     key: "country",
//     render: (employee: Employee) => {
//       if (employee.first === "initial") {
//         return <Form.Item
//           name="country"
//           rules={[
//             {
//               required: true,
//               message: "Please provide a country",
//             },
//           ]}
//           style={{ marginBottom: 0 }}
//         >
//           <Select
//             options={[
//               { value: "France", label: "France" },
//               { value: "Spain", label: "Spain" },
//               { value: "Germany", label: "Germany" },
//             ]}
//           />
//         </Form.Item>
//       } else if (!selectedDisplay) {
//         return <AccessTag access={employee.country} />
//       } else if (selectedDisplay.country.includes(employee.uuid)) {
//         return employee.country
//       } else if (employee.country === "Fail to decrypt") {
//         return <Tag icon={<IoLockClosed />}>{employee.country}</Tag>
//       } else {
//         return <div className="light">{employee.country}</div>
//       }
//     }
//   },
//   {
//     title: "E-mail",
//     key: "email",
//     render: (employee: Employee) => {
//       if (employee.email === "initial") {
//         return <Form.Item
//           name="email"
//           rules={[
//             {
//               whitespace: false,
//               required: true,
//               message: "Please provide a email",
//             },
//           ]}
//           style={{ marginBottom: 0 }}
//         >
//           <Input placeholder="Email" />
//         </Form.Item>
//       } else if (!selectedDisplay || selectedDisplay.email.includes(employee.uuid)) {
//         return employee.email
//       } else if (employee.email === "Fail to decrypt") {
//         return <Tag icon={<IoLockClosed />}>{employee.email}</Tag>
//       } else {
//         return <div className = "light" > { employee.email }</div>
//       }
//     }
//   },
//   {
//     title: "Salary",
//     key: "salary",
//     render: (employee: Employee) => {
//       if (employee.salary === 0) {
//         return <Space>
//           <Form.Item
//             name="salary"
//             rules={[
//               {
//                 whitespace: false,
//                 required: true,
//                 message: "Please provide a salary",
//               },
//             ]}
//             style={{ marginBottom: 0 }}
//           >
//             <Input type="number" placeholder="0" />
//           </Form.Item>{" "}
//           <Button htmlType="submit">Add</Button>
//         </Space>
//       } else if (!selectedDisplay || selectedDisplay.email.includes(employee.uuid)) {
//         return `$${employee.salary}`
//       } else if (employee.salary === "Fail to decrypt") {
//         return <Tag icon={<IoLockClosed />}>{employee.salary}</Tag>
//       } else {
//         return <div className="light">{`$${employee.salary}`}</div>
//       }
//     }
//   },
// ]

// export const columnsEncrypted = (selectedDisplay?: { marketing: number[], hr: number[], first: number[], last: number[], country: number[], email: number[], salary: number[] }): ColumnsType<EncryptedElement> => [
//   {
//     title: <div className="tag"><AccessTag access="Marketing" /></div>,
//     dataIndex: "marketing",
//     key: "marketing",
//     ellipsis: true,
//     render: (content: string, line: EncryptedElement) =>
//       !selectedDisplay || (selectedDisplay && selectedDisplay.marketing.includes(line.key)) ? (
//         content
//       ) : (
//       <div className="light">{content}</div>
//     ),
//   },
//   {
//     title: <div className="tag"><AccessTag access="HR" /></div>,
//     dataIndex: "hr",
//     key: "hr",
//     ellipsis: true,
//     render: (content: string, line: EncryptedElement) =>
//       !selectedDisplay || (selectedDisplay && selectedDisplay.hr.includes(line.key)) ? (
//         content
//       ) : (
//       <div className="light">{content}</div>
//     ),
//   },
// ]
