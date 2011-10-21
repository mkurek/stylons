{
    "id" : "cartToolbar${c.id}",
    "type" : "Toolbar",
    "dock" : "top",
    % if c.cost:
    "title" : "Koszyk (${c.cost} zł)"
    % else:
    "title" : "Koszyk"
    % endif
}