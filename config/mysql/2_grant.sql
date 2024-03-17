--  -*- text -*-
--
-- setup.sql -- MySQL commands for creating the RADIUS user.
--
--	WARNING: You should change 'mysql' and 'radpass'
--		 to something else.  Also update raddb/mods-available/sql
--		 with the new RADIUS password.
--
--	$Id$
--

--
--  Create default administrator for RADIUS
--
CREATE USER 'radius'@'mysql' IDENTIFIED BY 'radpass';

--
--  The server can read the authorisation data
--
GRANT SELECT ON radius.radcheck TO 'radius'@'mysql';
GRANT SELECT ON radius.radreply TO 'radius'@'mysql';
GRANT SELECT ON radius.radusergroup TO 'radius'@'mysql';
GRANT SELECT ON radius.radgroupcheck TO 'radius'@'mysql';
GRANT SELECT ON radius.radgroupreply TO 'radius'@'mysql';

--
--  The server can write accounting and post-auth data
--
GRANT SELECT, INSERT, UPDATE ON radius.radacct TO 'radius'@'mysql';
GRANT SELECT, INSERT, UPDATE ON radius.radpostauth TO 'radius'@'mysql';

--
--  The server can read the NAS data
--
GRANT SELECT ON radius.nas TO 'radius'@'mysql';

--
--  In the case of the "lightweight accounting-on/off" strategy, the server also
--  records NAS reload times
--
GRANT SELECT, INSERT, UPDATE ON radius.nasreload TO 'radius'@'mysql';
