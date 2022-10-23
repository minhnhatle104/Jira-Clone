import React from 'react'
import { useDispatch } from 'react-redux'
import { GET_TASK_DETAIL_SAGA } from '../../../redux/constants/CyberBugs/TaskConstants'

export default function ContentMain(props) {
	const { projectDetail } = props
	const dispatch = useDispatch()

	const renderCard = () => {
		console.log("project:", projectDetail)
		return projectDetail.lstTask?.map((taskListDetail, index) => {
			console.log("task List:", taskListDetail.lstTaskDeTail)
			return <div className="card" style={{ width: '17rem', height: 'auto' }} key={index}>
				<div className="card-header">
					{taskListDetail.statusName}
				</div>
				<ul className="list-group list-group-flush">
					{taskListDetail.lstTaskDeTail.map((task, index) => {
						return <li key={index} className="list-group-item pb-2" data-toggle="modal" data-target="#infoModal"
							style={{ cursor: 'pointer' }} onClick={() => {
								dispatch({
									type: GET_TASK_DETAIL_SAGA,
									taskId: task.taskId
								})
							}}>
							<p className='font-weight-bold'>
								{task.taskName}
							</p>
							<div className="block" style={{ display: 'flex' }}>
								<div className="block-left">
									<p className='text-danger'>{task.priorityTask.priority}</p>
								</div>
								<div className="block-right">
									<div className="avatar-group" style={{ display: 'flex' }}>
										{task.assigness.map((mem, index) => {
											return <div className="avatar" key={index}>
												<img src={mem.avatar} alt={mem.avatar} />
											</div>
										})}
									</div>
								</div>
							</div>
						</li>
					})}
				</ul>
			</div>
		})
	}


	return (
		<div className="content" style={{ display: 'flex' }}>
			{renderCard()}
		</div>

	)
}





{/* <div className="card" style={{ width: '17rem', height: '25rem' }}>
<div className="card-header">
  SELECTED FOR DEVELOPMENT 2
</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: '17rem', height: '25rem' }}>
        <div className="card-header">
          IN PROGRESS 2
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
<div className="card" style={{ width: '17rem', height: '25rem' }}>
        <div className="card-header">
          DONE 3
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div> */}