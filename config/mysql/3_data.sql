-- insert nas id gateway
INSERT INTO nas (id, nasname, shortname, type, ports, secret, server, community, description) 
    VALUES (1, ${HOST}, '', '', null, 'secret', null, null, 'gateway');
-- control-center data
