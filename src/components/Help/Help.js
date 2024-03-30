import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './Help.scss';

function Help() {
    return (
        <div className="container2">
            <h1 className="help-title">Help</h1>
            <p className="help-paragraph">Welcome to the help page. Here you'll find assistance on various tasks and features.</p>

            <div className='help-container'>
                <aside className="help-aside">
                    <NavLink to="/help" className="help-nav-link">Introduction</NavLink>
                    <NavLink to="/help/add" className="help-nav-link">Adding a Task</NavLink>
                    <NavLink to="/help/remove" className="help-nav-link">Removing a Task</NavLink>
                    <NavLink to="/help/status" className="help-nav-link">Changing Task Status</NavLink>
                </aside>

                <div className="help-article">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Help;
