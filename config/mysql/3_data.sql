-- insert nas id gateway
INSERT INTO nas (id, nasname, shortname, type, ports, secret, server, community, description) 
    VALUES (null, ${HOST}, '', '', null, 'secret', null, null, 'gateway');
-- control-center data
