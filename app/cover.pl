#!/usr/bin/perl

use strict;
my $tap_file = "test.tap";
open(FILE, $tap_file) or die "Could not open file\n";

my @output_array = ();
while (my $line = <FILE> ) {
	push (@output_array, $line);
}

#my @output_array = split(/\n/, $cmd_output);
foreach my $line (@output_array) {
	if ($line =~ m/([a-zA-Z]+)\s+:\s+(\d+\.\d+)%/) {
		my $percentage = sprintf ("%.2f", $2);
		my $category = $1;
		my $op;
		if ($percentage < 70.00) {
			print "Failing build because $category coverage is less than".
				" threshold of $percentage%\n";
			exit(1);
		} else {
			$op = sprintf "%-11s - %s", $category, $percentage;
		}
		print "$op%\n";
	} elsif ($line =~ m/([a-zA-Z]+)\s+:\s+(\d+)%/) {
		my $percentage = sprintf ("%.2f", $2);
		my $category = $1;
		my $op;
		if ($percentage < 80.65) {
			exit(1);
		} else {
			$op = sprintf "%-11s - %d", $category, $percentage;
		}
		print "$op%\n";
	}
}

close(FILE);
