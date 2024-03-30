import { Row, Col } from 'antd';
import { useUsers } from "../context/usersContext.jsx";



export function GridRow({ user }) {
    return
    <div>
        <Row className="gutter-row" key={user._id} span={6}>
            <Col className="gutter-row" span={6}>
                <div className="grid-cell">{user._id}</div>
            </Col >
            <Col className="gutter-row" span={4}>
                <div className="grid-cell">{user.givenName}</div>
            </Col >
            <Col className="gutter-row" span={4}>
                <div className="grid-cell">{user.lastName}</div>
            </Col >
            <Col className="gutter-row" span={6}>
                <div className="grid-cell">{user.email}</div>
            </Col >
            <Col className="gutter-row" span={4}>
                <div className="grid-cell">{user.role.description}</div>
            </Col >
        </Row>
    </div>
}