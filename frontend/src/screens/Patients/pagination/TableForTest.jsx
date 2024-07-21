function TableForTest(props) {
  // table classes styles
  const thclass = 'text-start text-sm font-medium py-3 px-2 whitespace-nowrap';
  const tdclass = 'text-start text-sm py-4 px-2 whitespace-nowrap';

  return (
    <table className="table-auto w-full text-center">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>#</th>
          <th className={thclass}>first Name</th>
          <th className={thclass}>last Name</th>
          <th className={thclass}>email</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => (
          <tr
            key={user.id}
            className="group border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>{user.id}</td>
            <td className={tdclass}>
              <div className="flex gap-4 items-center">
                <div className=''>
                  <h4 className="text-sm font-medium">{user.firstName}</h4>
                </div>
              </div>
            </td>
            <td className={tdclass}>
              <div className="flex gap-4 items-center">
                <div className=''>
                  <h4 className="text-sm font-medium">{user.lastName}</h4>
                </div>
              </div>
            </td>
            <td className={tdclass}>
              <div className="flex gap-4 items-center">
                <div className=''>
                  <h4 className="text-sm font-medium">{user.email}</h4>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableForTest